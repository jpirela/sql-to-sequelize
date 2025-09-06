// api/models/attributes_values.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const attributesValues = sequelize.define('attributesValues', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_attribute: { type: DataTypes.INTEGER, allowNull: false },
 value: { type: DataTypes.STRING, allowNull: false },
 parent: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'attributes_values',
    timestamps: true,
  });

  attributesValues.associate = (models) => {
    attributesValues.belongsTo(models.attributes, {
      foreignKey: 'id_attribute',
      as: 'attributes',
    });
    attributesValues.belongsTo(models.attributesValues, {
      foreignKey: 'parent',
      as: 'attributesValues',
    });
    attributesValues.hasMany(models.productsAttributes, {
      foreignKey: 'id_attribute_value1',
      as: 'productsAttributes',
    });
    attributesValues.hasMany(models.productsAttributes, {
      foreignKey: 'id_attribute_value2',
      as: 'productsAttributes',
    });
  };

  return attributesValues;
};
