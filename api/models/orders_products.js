// api/models/orders_products.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ordersProducts = sequelize.define('ordersProducts', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_order: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 id_product_variant: { type: DataTypes.INTEGER, allowNull: false },
 packages: { type: DataTypes.INTEGER, allowNull: false },
 disc: { type: DataTypes.INTEGER, allowNull: false },
 quantity: { type: DataTypes.INTEGER, allowNull: false },
 price: { type: DataTypes.DECIMAL, allowNull: false },
 offert: { type: DataTypes.DECIMAL, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'orders_products',
    timestamps: true,
  });

  ordersProducts.associate = (models) => {
    ordersProducts.belongsTo(models.orders, {
      foreignKey: 'id_order',
      as: 'orders',
    });
    ordersProducts.belongsTo(models.productsPrimes, {
      foreignKey: 'id_product_variant',
      as: 'productsPrimes',
    });
    ordersProducts.hasMany(models.ordersProductsOptions, {
      foreignKey: 'id_order_product',
      as: 'ordersProductsOptions',
    });
  };

  return ordersProducts;
};
