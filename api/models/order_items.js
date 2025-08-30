// api/models/order_items.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const orderItems = sequelize.define('orderItems', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 order_id: { type: DataTypes.INTEGER, allowNull: false },
 product_id: { type: DataTypes.INTEGER, allowNull: false },
 quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
 unit_price: { type: DataTypes.DECIMAL, allowNull: false },
 total_price: { type: DataTypes.DECIMAL, allowNull: false },
  }, {
    tableName: 'order_items',
    timestamps: false,
  });

  orderItems.associate = (models) => {
    orderItems.belongsTo(models.orders, {
      foreignKey: 'order_id',
      as: 'orderItemsorders',
    });
    orderItems.belongsTo(models.products, {
      foreignKey: 'product_id',
      as: 'orderItemsproducts',
    });
  };

  return orderItems;
};
