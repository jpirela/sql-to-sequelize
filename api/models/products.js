// api/models/products.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const products = sequelize.define('products', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, allowNull: false },
 description: { type: DataTypes.STRING },
 price: { type: DataTypes.DECIMAL, allowNull: false },
 category_id: { type: DataTypes.INTEGER, allowNull: false },
 created_by: { type: DataTypes.INTEGER, allowNull: false },
 is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
 created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'products',
    timestamps: true,
  });

  products.associate = (models) => {
    products.belongsTo(models.categories, {
      foreignKey: 'category_id',
      as: 'productscategories',
    });
    products.belongsTo(models.users, {
      foreignKey: 'created_by',
      as: 'productsusers',
    });
    products.hasOne(models.orderItems, {
      foreignKey: 'product_id',
      as: 'productsorderItems',
    });
    products.belongsToMany(models.tags, {
      through: 'product_tags',
      foreignKey: 'product_id',
      otherKey: 'tag_id',
      as: 'productstagss',
    });
  };

  return products;
};
