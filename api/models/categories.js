// api/models/categories.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const categories = sequelize.define('categories', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 sx: { type: DataTypes.INTEGER, allowNull: false },
 dx: { type: DataTypes.INTEGER, allowNull: false },
 id_attribute_first: { type: DataTypes.INTEGER, allowNull: false },
 id_attribute_second: { type: DataTypes.INTEGER, allowNull: false },
 meta_keywords: { type: DataTypes.STRING, allowNull: false },
 meta_description: { type: DataTypes.STRING, allowNull: false },
 parent: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 position: { type: DataTypes.INTEGER, allowNull: false },
 visible: { type: DataTypes.BOOLEAN, allowNull: false },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'categories',
    timestamps: true,
  });

  categories.associate = (models) => {
    categories.belongsTo(models.categories, {
      foreignKey: 'parent',
      as: 'categories',
    });
    categories.hasMany(models.attributes, {
      foreignKey: 'id_category',
      as: 'attributes',
    });
    categories.hasMany(models.attrTags, {
      foreignKey: 'id_category',
      as: 'attrTags',
    });
    categories.hasMany(models.options, {
      foreignKey: 'id_category',
      as: 'options',
    });
    categories.hasMany(models.products, {
      foreignKey: 'id_category',
      as: 'products',
    });
  };

  return categories;
};
