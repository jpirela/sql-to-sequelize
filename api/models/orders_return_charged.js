// api/models/orders_return_charged.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ordersReturnCharged = sequelize.define('ordersReturnCharged', {
 id: { type: DataTypes.INTEGER, autoIncrement: true, allowNull: false },
 date_process: { type: DataTypes.STRING, allowNull: false },
 date_movement: { type: DataTypes.STRING, allowNull: false },
 u_from: { type: DataTypes.INTEGER, allowNull: false },
 id_order: { type: DataTypes.INTEGER, allowNull: false },
 method_charged: { type: DataTypes.STRING, allowNull: false },
 amount: { type: DataTypes.DECIMAL, allowNull: false },
 notes: { type: DataTypes.STRING },
 url_file: { type: DataTypes.STRING, defaultValue: 'NULL' },
  }, {
    tableName: 'orders_return_charged',
    timestamps: false,
  });

  ordersReturnCharged.associate = (models) => {
    // Sin asociaciones
  };

  return ordersReturnCharged;
};
