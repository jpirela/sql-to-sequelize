// api/models/orders.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const orders = sequelize.define('orders', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 user_id: { type: DataTypes.INTEGER, allowNull: false },
 total_amount: { type: DataTypes.DECIMAL, allowNull: false },
 status: { type: DataTypes.STRING, defaultValue: 'pending' },
 created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'orders',
    timestamps: true,
  });

  orders.associate = (models) => {
    orders.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'ordersusers',
    });
    orders.hasOne(models.orderItems, {
      foreignKey: 'order_id',
      as: 'ordersorderItems',
    });
  };

  return orders;
};
