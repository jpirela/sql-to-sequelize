// api/models/attributes.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const attributes = sequelize.define('attributes', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 utilities: { type: DataTypes.STRING, allowNull: false },
 caption: { type: DataTypes.STRING, defaultValue: 'NULL' },
 id_category: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 level: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 parent: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'attributes',
    timestamps: true,
  });

  attributes.associate = (models) => {
    attributes.belongsTo(models.categories, {
      foreignKey: 'id_category',
      as: 'categories',
    });
    attributes.belongsTo(models.attributes, {
      foreignKey: 'parent',
      as: 'attributes',
    });
    attributes.hasMany(models.attributesValues, {
      foreignKey: 'id_attribute',
      as: 'attributesValues',
    });
  };

  return attributes;
};
