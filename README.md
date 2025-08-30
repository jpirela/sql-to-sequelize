# SQL → Sequelize Model Generator

Este proyecto genera automáticamente **modelos Sequelize para Express.js** a partir de un **dump SQL** de PostgreSQL o MySQL/MariaDB.

Su objetivo es permitir que, dado cualquier archivo de respaldo `.sql`, se obtenga un conjunto de archivos `.js` en la carpeta `api/models/`, cada uno representando una tabla de la base de datos con sus campos, tipos de datos y asociaciones definidas.

---

## 📌 Prompt de especificaciones

El script en Python debe:

1. Recibir como argumento el nombre de un archivo `.sql` que contenga el respaldo de una base de datos PostgreSQL o MySQL/MariaDB.  
2. Detectar automáticamente el motor (PostgreSQL vs MySQL/MariaDB).  
   - Si no se puede determinar, solicitar confirmación al usuario.  
3. Analizar el contenido y extraer todas las sentencias `CREATE TABLE`.  
4. Detectar:  
   - Nombres de tablas.  
   - Columnas y sus tipos de datos.  
   - Claves primarias.  
   - Claves foráneas.  
5. Generar un archivo de modelo por cada tabla en `api/models/`.  

### 🔧 Reglas de generación de modelos

- **Nombre del archivo**: igual al nombre de la tabla (ejemplo: `orders.js`).  
- **Nombre del modelo**: versión camelCase del nombre de la tabla (ejemplo: `order_items` → `orderItems`).  
- **tableName**: exactamente el nombre de la tabla en la base de datos.  
- **Campos**:
  - Si es clave primaria entera, será `{ type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }`.  
  - Si es PK de texto, será `{ type: DataTypes.STRING, primaryKey: true }`.  
  - Los demás campos se mapean así:  

| Tipo SQL                                       | Tipo Sequelize     |
|------------------------------------------------|--------------------|
| `integer`, `bigint`, `smallint`, `serial`      | `DataTypes.INTEGER`|
| `decimal`, `numeric`, `real`, `double`         | `DataTypes.DECIMAL`|
| `text`, `varchar`, `character varying`, `char` | `DataTypes.STRING` |
| `boolean`, `tinyint(1)`                        | `DataTypes.BOOLEAN`|
| `timestamp`, `date`, `time`                    | `DataTypes.DATE`   |
| `json`, `jsonb`                                | `DataTypes.JSON`   |
| `uuid`                                         | `DataTypes.UUID`   |

- **Asociaciones (`associate`)**:
  - `belongsTo`: si la tabla contiene una clave foránea.  
  - `hasMany`: si otra tabla apunta a esta.  
  - `hasOne`: si existe relación 1:1 (detectada según constraints).  
  - `belongsToMany`: opcional para tablas de unión (N:N).  

El alias `as` será formado por `modeloOrigen + modeloDestino`.  

---

## 📂 Estructura del proyecto

```
sql-to-sequelize/
├── README.md
├── requirements.txt
├── generate_models.py
└── api/
    └── models/   # Archivos .js generados aquí
```

---

## ⚙️ Instalación

1. Clonar este repositorio o copiar el proyecto.  
2. Crear un entorno virtual de Python:  
   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate      # Windows
   ```
3. Instalar dependencias:  
   ```bash
   pip install -r requirements.txt
   ```

---

## ▶️ Uso

Ejecuta el script con el archivo SQL:

```bash
python generate_models.py datos.sql
```

Ejemplo de salida en consola:

```
🔍 Motor detectado: PostgreSQL
¿Desea continuar? (s/n): s
📦 Analizando CREATE TABLE en dump PostgreSQL...
✅ Tablas encontradas: 7
✅ Modelo generado: product.js
✅ Modelo generado: product_variant.js
✅ Modelo generado: orders.js
🎉 Generación completada: 7 modelos
```

Los archivos `.js` se encontrarán en `api/models/`.

---

## 🧩 Ejemplo de conversión

### Entrada (dump SQL PostgreSQL)

```sql
CREATE TABLE public.product (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.product_variant (
    id SERIAL PRIMARY KEY,
    product_id integer NOT NULL,
    price numeric(10,2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
);
```

### Salida esperada (`api/models/product.js`)

```js
// api/models/product.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const product = sequelize.define('product', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE },
    updated_at: { type: DataTypes.DATE },
  }, {
    tableName: 'product',
    timestamps: false,
  });

  product.associate = (models) => {
    product.hasMany(models.productVariant, {
      foreignKey: 'product_id',
      as: 'productProductVariant',
    });
  };

  return product;
};
```

### Salida esperada (`api/models/product_variant.js`)

```js
// api/models/product_variant.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const productVariant = sequelize.define('productVariant', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.INTEGER },
    price: { type: DataTypes.DECIMAL },
  }, {
    tableName: 'product_variant',
    timestamps: false,
  });

  productVariant.associate = (models) => {
    productVariant.belongsTo(models.product, {
      foreignKey: 'product_id',
      as: 'productVariantProduct',
    });
  };

  return productVariant;
};
```

---

## 📌 Ejemplo con MySQL

### Entrada

```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    total DECIMAL(10,2),
    created_at DATETIME,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);
```

### Salida (`api/models/orders.js`)

```js
// api/models/orders.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const orders = sequelize.define('orders', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    client_id: { type: DataTypes.INTEGER },
    total: { type: DataTypes.DECIMAL },
    created_at: { type: DataTypes.DATE },
  }, {
    tableName: 'orders',
    timestamps: false,
  });

  orders.associate = (models) => {
    orders.belongsTo(models.clients, {
      foreignKey: 'client_id',
      as: 'ordersClients',
    });
  };

  return orders;
};
```

---

## 🎆 Funcionalidades Avanzadas

### 🔗 Detección Automática de Relaciones 1:1 (hasOne)

El generador detecta automáticamente relaciones 1:1 cuando una clave foránea tiene un constraint `UNIQUE`. En lugar de generar una relación `hasMany`, creará una relación `hasOne`.

**Ejemplo:**
```sql
CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

Generará:
```js
// En users.js
user.hasOne(models.userProfile, {
  foreignKey: 'user_id',
  as: 'userUserProfile'
});
```

### 🔄 Detección de Tablas de Unión (belongsToMany)

Detecta automáticamente tablas de unión que contengan principalmente claves foráneas y genera relaciones `belongsToMany` en las tablas principales.

**Ejemplo:**
```sql
CREATE TABLE user_roles (
    user_id INTEGER,
    role_id INTEGER,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

Generará:
```js
// En users.js
user.belongsToMany(models.role, {
  through: 'user_roles',
  foreignKey: 'user_id',
  otherKey: 'role_id',
  as: 'userRoles'
});
```

### 🔒 Constraints Únicos y Restricciones

Parsea y aplica constraints únicos, valores por defecto y restricciones `NOT NULL`:

```js
email: {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false
},
status: {
  type: DataTypes.STRING,
  defaultValue: 'active'
}
```

### ⏰ Timestamps Automáticos

Detecta automáticamente campos `created_at` y `updated_at` y habilita `timestamps: true` cuando corresponda:

```js
// Si la tabla tiene created_at y updated_at
{
  tableName: 'users',
  timestamps: true  // Habilitado automáticamente
}
```

---

## 📜 Roadmap

- ✅ Detección de motor (PostgreSQL/MySQL).  
- ✅ Parseo de columnas y tipos de datos.  
- ✅ Generación de claves primarias.  
- ✅ Detección de claves foráneas y asociaciones (belongsTo / hasMany).  
- ✅ **Detección automática de relaciones 1:1 (`hasOne`)**.  
- ✅ **Detección de tablas de unión para `belongsToMany`**.  
- ✅ **Soporte de índices únicos y constraints adicionales**.  
- ✅ **Configuración de `timestamps` según convenciones (`created_at`, `updated_at`)**.  
- ✅ **Exportación a un `index.js` central que importe todos los modelos**.

---

## ⚙️ Integración con Express.js

### Configuración de Controladores

Una vez generados los modelos, puedes integrarlos fácilmente en tu aplicación Express.js. El archivo `api/models/index.js` ya está preparado para importar automáticamente todos los modelos.

#### 1. Configuración de Variables de Entorno

Crea un archivo `.env` en tu proyecto Express.js:

```env
# Base de datos
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_PORT=5432
IP_DEVELOPMENT=localhost
IP_PRODUCTION=tu_servidor_produccion
MODE_ENV=development
NODE_ENV=development
```

#### 2. Uso en Controladores

```js
// controllers/userController.js
import { getModels } from '../api/models/index.js';

export const getAllUsers = async (req, res) => {
  try {
    const { user } = await getModels(process.env.DB_NAME);
    
    const users = await user.findAll({
      include: [
        {
          association: 'userUserProfile', // Relación 1:1
        },
        {
          association: 'userRoles', // Relación many-to-many
        }
      ]
    });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { user } = await getModels(process.env.DB_NAME);
    
    const newUser = await user.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
```

#### 3. Configuración de Rutas

```js
// routes/userRoutes.js
import express from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/users', createUser);

export default router;
```

#### 4. App Principal

```js
// app.js
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { getModels } from './api/models/index.js';

dotenv.config();

const app = express();
app.use(express.json());

// Inicializar conexión a la base de datos al arrancar
getModels(process.env.DB_NAME)
  .then(() => {
    console.log('📊 Modelos cargados exitosamente');
  })
  .catch(error => {
    console.error('❌ Error cargando modelos:', error);
  });

// Rutas
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});

export default app;
```

#### 5. Uso de Asociaciones Generadas

Los modelos generados incluyen todas las asociaciones detectadas automáticamente:

```js
// Ejemplo de queries con asociaciones
const { user, userProfile, role } = await getModels(process.env.DB_NAME);

// Obtener usuario con perfil (relación 1:1)
const userWithProfile = await user.findOne({
  where: { id: 1 },
  include: [{ association: 'userUserProfile' }]
});

// Obtener usuario con roles (relación many-to-many)
const userWithRoles = await user.findOne({
  where: { id: 1 },
  include: [{ association: 'userRoles' }]
});

// Crear relaciones many-to-many
const newUser = await user.create({ name: 'Juan', email: 'juan@example.com' });
const adminRole = await role.findOne({ where: { name: 'admin' } });
await newUser.addUserRole(adminRole);
```

### 📝 Notas Importantes

1. **Cache de Modelos**: El `index.js` incluye un sistema de cache que evita recargar los modelos en cada request.

2. **Conexiones Múltiples**: Puedes trabajar con múltiples bases de datos pasando diferentes nombres a `getModels()`.

3. **Asociaciones Automáticas**: Todas las relaciones (1:1, 1:N, N:N) se configuran automáticamente según el análisis del dump SQL.

4. **Timestamps**: Si se detectan campos `created_at` y `updated_at`, se habilita automáticamente `timestamps: true`.

5. **Instalación**: Se deben copiar en la raiz del proyecto las carpetas `config` y `api`.

---

## 🤝 Contribución

¡Las PR son bienvenidas! El objetivo es que este script se convierta en una herramienta universal para migrar fácilmente bases SQL a modelos Sequelize listos para usar en Express.js.

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles. Contribución
