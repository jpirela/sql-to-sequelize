// api/models/orders_products_options.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ordersProductsOptions = sequelize.define('ordersProductsOptions', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_order_product: { type: DataTypes.INTEGER, allowNull: false },
 id_product_option: { type: DataTypes.INTEGER, allowNull: false },
 quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '1' },
 price_extra: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: '0.00' },
  }, {
    tableName: 'orders_products_options',
    timestamps: false,
  });

  ordersProductsOptions.associate = (models) => {
    ordersProductsOptions.belongsTo(models.ordersProducts, {
      foreignKey: 'id_order_product',
      as: 'ordersProducts',
    });
    ordersProductsOptions.belongsTo(models.productsOptions, {
      foreignKey: 'id_product_option',
      as: 'productsOptions',
    });
  };

  return ordersProductsOptions;
};
