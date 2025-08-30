#!/usr/bin/env python3
import sys
import os
import re
from collections import defaultdict

# =============================
# Detección de motor
# =============================

def detect_engine(sql_content: str) -> str:
    mysql_patterns = [r"\bAUTO_INCREMENT\b", r"\bENGINE=", r"\bCHARSET=", r"^USE\s+`"]
    postgres_patterns = [r"\bSERIAL\b", r"\bBIGSERIAL\b", r"\bSEQUENCE\b",
                         r"\bOWNER TO\b", r"\bWITH TIME ZONE\b", r"\bpublic\."]

    for pattern in mysql_patterns:
        if re.search(pattern, sql_content, re.IGNORECASE | re.MULTILINE):
            return "MySQL/MariaDB"

    for pattern in postgres_patterns:
        if re.search(pattern, sql_content, re.IGNORECASE | re.MULTILINE):
            return "PostgreSQL"

    return "Desconocido"


def confirm_engine(engine: str) -> str:
    if engine == "Desconocido":
        print("⚠️ No se pudo detectar automáticamente el motor.")
        engine = input("Por favor indica el motor (PostgreSQL/MySQL): ").strip()
    else:
        print(f"🔍 Motor detectado: {engine}")
        confirm = input("¿Desea continuar? (s/n): ").strip().lower()
        if confirm != "s":
            print("❌ Operación cancelada.")
            sys.exit(0)
    return engine

# =============================
# Parseo CREATE TABLE
# =============================

def parse_create_table(sql_content: str, engine: str):
    tables = re.findall(r"CREATE TABLE.*?\);", sql_content, re.DOTALL | re.IGNORECASE)
    return tables

def map_sql_type_to_datatype(sql_type: str, engine: str) -> str:
    sql_type = sql_type.lower()
    if any(t in sql_type for t in ["int", "serial", "bigint", "smallint"]):
        return "DataTypes.INTEGER"
    if any(t in sql_type for t in ["decimal", "numeric", "real", "double", "float"]):
        return "DataTypes.DECIMAL"
    if any(t in sql_type for t in ["text", "char", "varchar"]):
        return "DataTypes.STRING"
    if "boolean" in sql_type or sql_type.startswith("tinyint(1)"):
        return "DataTypes.BOOLEAN"
    if "date" in sql_type or "time" in sql_type:
        return "DataTypes.DATE"
    if "json" in sql_type:
        return "DataTypes.JSON"
    if "uuid" in sql_type:
        return "DataTypes.UUID"
    return "DataTypes.STRING"

def parse_table_definition(table_sql: str, engine: str):
    lines = [l.strip().strip(",") for l in table_sql.splitlines()]
    header = lines[0]
    match = re.search(r"CREATE TABLE\s+[`\"]?(\w+)[`\"]?", header, re.IGNORECASE)
    table_name = match.group(1) if match else "unknown"

    columns = {}
    pk_fields = []
    fks = []
    unique_constraints = []
    indexes = []
    default_values = {}
    has_timestamps = False

    for line in lines[1:]:
        if line.startswith(")"):
            continue
        if line.upper().startswith("PRIMARY KEY"):
            m = re.findall(r"\((.*?)\)", line)
            if m:
                pk_fields.extend([f.strip().replace("`", "").replace("\"", "") for f in m[0].split(",")])
            continue
        if line.upper().startswith("FOREIGN KEY"):
            fk_field_match = re.search(r"\((.*?)\)", line)
            fk_field = fk_field_match.group(1).replace("`", "").replace("\"", "") if fk_field_match else ""
            ref_table_match = re.search(r"REFERENCES\s+[`\"]?(\w+)[`\"]?", line, re.IGNORECASE)
            ref_table = ref_table_match.group(1) if ref_table_match else ""
            ref_field_match = re.search(r"\((.*?)\)", line.split("REFERENCES")[1]) if "REFERENCES" in line else None
            ref_field = ref_field_match.group(1).replace("`", "").replace("\"", "") if ref_field_match else ""
            fks.append((fk_field, ref_table, ref_field))
            continue
        if line.upper().startswith("UNIQUE"):
            unique_match = re.search(r"\((.*?)\)", line)
            if unique_match:
                unique_fields = [f.strip().replace("`", "").replace("\"", "") for f in unique_match.group(1).split(",")]
                unique_constraints.extend(unique_fields)
            continue
        if line.upper().startswith("INDEX") or line.upper().startswith("KEY"):
            continue  # Skip index definitions for now

        # Parse column definitions
        parts = line.split()
        if len(parts) < 2:
            continue
            
        col = parts[0].replace("`", "").replace("\"", "")
        col_type = parts[1]
        
        # Check for inline constraints
        line_upper = line.upper()
        is_unique = "UNIQUE" in line_upper
        is_not_null = "NOT NULL" in line_upper
        is_primary_key = "PRIMARY KEY" in line_upper
        
        # Si es PRIMARY KEY inline, agregarlo a pk_fields
        if is_primary_key:
            pk_fields.append(col)
        
        # Extract default values (mejorado para manejar funciones como NOW())
        default_match = re.search(r"DEFAULT\s+([^,\s]+(?:\([^\)]*\))?|'[^']*')", line, re.IGNORECASE)
        if default_match:
            default_val = default_match.group(1).strip()
            # Mapear valores especiales de SQL a Sequelize
            if default_val.upper() in ['NOW()', 'CURRENT_TIMESTAMP', 'CURRENT_TIMESTAMP()']:
                default_values[col] = 'DataTypes.NOW'
            elif default_val.upper() in ['TRUE', 'FALSE']:
                default_values[col] = default_val.lower()
            elif default_val.startswith("'") and default_val.endswith("'"):
                # String literal
                default_values[col] = default_val
            elif default_val.replace('.', '').replace('-', '').isdigit():
                # Numeric value
                default_values[col] = default_val
            else:
                # Other values as strings
                default_values[col] = f"'{default_val}'"
        
        # Check for timestamps
        if col.lower() in ['created_at', 'updated_at'] and 'timestamp' in col_type.lower():
            has_timestamps = True
        
        if is_unique:
            unique_constraints.append(col)
            
        columns[col] = {
            'type': map_sql_type_to_datatype(col_type, engine),
            'unique': is_unique,
            'allowNull': not is_not_null,
            'defaultValue': default_values.get(col)
        }

    return table_name, columns, pk_fields, fks, unique_constraints, has_timestamps

# =============================
# Generación de archivo modelo
# =============================

def camel_case(name: str) -> str:
    parts = name.split("_")
    return parts[0].lower() + "".join(p.capitalize() for p in parts[1:])

def is_junction_table(table_name, columns, fks):
    """Detecta si una tabla es una tabla de unión para relaciones many-to-many"""
    # Una tabla de unión típicamente tiene:
    # 1. Solo claves foráneas (y posiblemente un ID)
    # 2. Al menos 2 claves foráneas
    # 3. Pocos campos adicionales
    
    if len(fks) < 2:
        return False
    
    # Contar columnas que no son foreign keys ni id
    non_fk_columns = 0
    fk_fields = [fk[0] for fk in fks]
    
    for col in columns:
        if col.lower() not in ['id', 'created_at', 'updated_at'] and col not in fk_fields:
            non_fk_columns += 1
    
    return non_fk_columns <= 1  # Permite máximo 1 campo adicional

def detect_one_to_one_relationships(table_name, columns, fks, unique_constraints, all_tables_data):
    """Detecta relaciones 1:1 basándose en constraints únicos en foreign keys"""
    one_to_one_relations = []
    
    for fk_field, ref_table, ref_field in fks:
        # Si la foreign key tiene constraint único, es relación 1:1
        if fk_field in unique_constraints:
            one_to_one_relations.append((fk_field, ref_table, ref_field))
    
    return one_to_one_relations

def generate_model_file(table_name, columns, pk_fields, fks, unique_constraints, has_timestamps, output_dir, all_tables_data):
    model_name = camel_case(table_name)
    
    # Detectar si es tabla de unión
    is_junction = is_junction_table(table_name, columns, fks)
    
    # Detectar relaciones 1:1
    one_to_one_rels = detect_one_to_one_relationships(table_name, columns, fks, unique_constraints, all_tables_data)
    one_to_one_fields = [rel[0] for rel in one_to_one_rels]

    fields_str = []
    for col, col_data in columns.items():
        if isinstance(col_data, dict):
            dtype = col_data['type']
            is_unique = col_data.get('unique', False)
            allow_null = col_data.get('allowNull', True)
            default_value = col_data.get('defaultValue')
        else:
            # Backward compatibility
            dtype = col_data
            is_unique = col in unique_constraints
            allow_null = True
            default_value = None
            
        pk = "primaryKey: true, " if col.strip() in pk_fields else ""
        auto_inc = "autoIncrement: true, " if ("SERIAL" in dtype or (col.strip().lower() == "id" and "INTEGER" in dtype)) else ""
        unique = "unique: true, " if is_unique else ""
        allow_null_str = "allowNull: false, " if not allow_null else ""
        default_str = f"defaultValue: {default_value}, " if default_value else ""
        
        field_def = f"    {col}: {{ type: {dtype}, {pk}{auto_inc}{unique}{allow_null_str}{default_str}}}"
        # Clean up extra spaces and commas
        field_def = re.sub(r',\s*}', ' }', field_def)
        field_def = re.sub(r'\s+', ' ', field_def)
        fields_str.append(field_def + ",")

    fields_code = "\n".join(fields_str)

    assoc_code = []
    
    # Manejar tabla de unión (belongsToMany)
    if is_junction and len(fks) >= 2:
        # Para tablas de unión, generar belongsToMany en ambas tablas relacionadas
        table_a = fks[0][1]  # Primera tabla referenciada
        table_b = fks[1][1]  # Segunda tabla referenciada
        
        # No generar asociaciones directas para la tabla de unión
        # Las asociaciones belongsToMany se manejarán en las tablas principales
        pass
    else:
        # Asociaciones belongsTo normales
        for fk_field, ref_table, ref_field in fks:
            ref_model = camel_case(ref_table)
            
            # Determinar si es relación 1:1
            if fk_field in one_to_one_fields:
                assoc_code.append(f"""    {model_name}.belongsTo(models.{ref_model}, {{
      foreignKey: '{fk_field}',
      as: '{model_name}{ref_model}',
    }});""")
            else:
                assoc_code.append(f"""    {model_name}.belongsTo(models.{ref_model}, {{
      foreignKey: '{fk_field}',
      as: '{model_name}{ref_model}',
    }});""")

    # Relaciones inversas (hasMany/hasOne)
    for src_table, src_data in all_tables_data.items():
        if src_table == table_name:
            continue
            
        src_fks = src_data['fks']
        src_unique_constraints = src_data.get('unique_constraints', [])
        
        for fk_field, ref_table, ref_field in src_fks:
            if ref_table == table_name:
                src_model = camel_case(src_table)
                
                # Verificar si la tabla fuente es tabla de unión
                src_is_junction = is_junction_table(src_table, src_data['columns'], src_fks)
                
                if src_is_junction:
                    # Para tablas de unión, generar belongsToMany
                    other_fks = [fk for fk in src_fks if fk[1] != table_name]
                    if other_fks:
                        other_table = other_fks[0][1]
                        other_model = camel_case(other_table)
                        assoc_code.append(f"""    {model_name}.belongsToMany(models.{other_model}, {{
      through: '{src_table}',
      foreignKey: '{fk_field}',
      otherKey: '{other_fks[0][0]}',
      as: '{model_name}{other_model}s',
    }});""")
                elif fk_field in src_unique_constraints:
                    # Relación 1:1 (hasOne)
                    assoc_code.append(f"""    {model_name}.hasOne(models.{src_model}, {{
      foreignKey: '{fk_field}',
      as: '{model_name}{src_model}',
    }});""")
                else:
                    # Relación 1:N (hasMany)
                    assoc_code.append(f"""    {model_name}.hasMany(models.{src_model}, {{
      foreignKey: '{fk_field}',
      as: '{model_name}{src_model}s',
    }});""")

    # Configurar timestamps automáticamente
    timestamps_config = "timestamps: true," if has_timestamps else "timestamps: false,"
    
    model_code = f"""// api/models/{table_name}.js
import {{ DataTypes }} from 'sequelize';

export default (sequelize) => {{
  const {model_name} = sequelize.define('{model_name}', {{
{fields_code}
  }}, {{
    tableName: '{table_name}',
    {timestamps_config}
  }});

  {model_name}.associate = (models) => {{
{os.linesep.join(assoc_code) if assoc_code else "    // Sin asociaciones"}
  }};

  return {model_name};
}};
"""

    os.makedirs(output_dir, exist_ok=True)
    with open(os.path.join(output_dir, f"{table_name}.js"), "w", encoding="utf-8") as f:
        f.write(model_code)
    print(f"✅ Modelo generado: {table_name}.js")

# =============================
# Main
# =============================

def main():
    if len(sys.argv) < 2:
        print("Uso: python generate_models.py <archivo.sql>")
        sys.exit(1)

    sql_file = sys.argv[1]
    if not os.path.isfile(sql_file):
        print(f"❌ Archivo no encontrado: {sql_file}")
        sys.exit(1)

    print("📦 Analizando dump SQL...")
    sql_content = open(sql_file, "r", encoding="utf-8", errors="ignore").read()
    engine = confirm_engine(detect_engine(sql_content))
    tables_sql = parse_create_table(sql_content, engine)
    
    print(f"📊 Tablas encontradas: {len(tables_sql)}")

    output_dir = os.path.join("api", "models")
    all_tables_data = {}
    
    # Primera pasada: parsear todas las tablas
    for t_sql in tables_sql:
        table_name, cols, pks, fks, unique_constraints, has_timestamps = parse_table_definition(t_sql, engine)
        all_tables_data[table_name] = {
            'columns': cols,
            'pk_fields': pks,
            'fks': fks,
            'unique_constraints': unique_constraints,
            'has_timestamps': has_timestamps
        }
    
    # Segunda pasada: generar modelos con información completa
    junction_tables = []
    for table_name, table_data in all_tables_data.items():
        cols = table_data['columns']
        pks = table_data['pk_fields']
        fks = table_data['fks']
        unique_constraints = table_data['unique_constraints']
        has_timestamps = table_data['has_timestamps']
        
        # Detectar tablas de unión
        if is_junction_table(table_name, cols, fks):
            junction_tables.append(table_name)
            print(f"🔗 Tabla de unión detectada: {table_name}")
        
        # Configurar timestamps automáticos
        timestamps_enabled = has_timestamps
        if timestamps_enabled:
            print(f"⏰ Timestamps automáticos habilitados para: {table_name}")
        
        generate_model_file(table_name, cols, pks, fks, unique_constraints, has_timestamps, output_dir, all_tables_data)
    
    print(f"\n📊 Resumen de generación:")
    print(f"  ✅ Modelos generados: {len(all_tables_data)}")
    print(f"  🔗 Tablas de unión detectadas: {len(junction_tables)}")
    if junction_tables:
        print(f"     - {', '.join(junction_tables)}")
    print(f"🎉 Generación completada")

if __name__ == "__main__":
    main()
