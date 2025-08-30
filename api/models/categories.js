// api/models/categories.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const categories = sequelize.define('categories', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, unique: true, allowNull: false },
 description: { type: DataTypes.STRING },
 parent_id: { type: DataTypes.INTEGER },
 created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'categories',
    timestamps: true,
  });

  categories.associate = (models) => {
    categories.belongsTo(models.categories, {
      foreignKey: 'parent_id',
      as: 'categoriescategories',
    });
    categories.hasMany(models.products, {
      foreignKey: 'category_id',
      as: 'categoriesproductss',
    });
  };

  return categories;
};
