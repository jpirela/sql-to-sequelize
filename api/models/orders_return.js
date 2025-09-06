// api/models/orders_return.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ordersReturn = sequelize.define('ordersReturn', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 products_list: { type: DataTypes.STRING, allowNull: false },
 data: { type: DataTypes.DATE, allowNull: false },
 data_order: { type: DataTypes.DATE, allowNull: false },
 id_client: { type: DataTypes.INTEGER, allowNull: false },
 session_client: { type: DataTypes.STRING, allowNull: false },
 subtotal: { type: DataTypes.DECIMAL, allowNull: false },
 grandtotal: { type: DataTypes.DECIMAL, allowNull: false },
 tax: { type: DataTypes.DECIMAL, allowNull: false },
 shipping_price: { type: DataTypes.DECIMAL, allowNull: false },
 payment_method: { type: DataTypes.STRING, allowNull: false },
 paypal_status: { type: DataTypes.STRING, allowNull: false },
 paypal_id_transaction: { type: DataTypes.STRING, allowNull: false },
 paypal_email_client: { type: DataTypes.STRING, allowNull: false },
 paypal_array: { type: DataTypes.STRING, allowNull: false },
 payment_price: { type: DataTypes.DECIMAL, allowNull: false },
 payment_advance: { type: DataTypes.DECIMAL, allowNull: false },
 billing_address: { type: DataTypes.STRING, allowNull: false },
 shipping_address: { type: DataTypes.STRING, allowNull: false },
 notes: { type: DataTypes.STRING, defaultValue: 'NULL' },
 coupon: { type: DataTypes.STRING, defaultValue: 'NULL' },
 discount_coupon: { type: DataTypes.DECIMAL, defaultValue: 'NULL' },
 code_order: { type: DataTypes.STRING, allowNull: false },
 number_invoice: { type: DataTypes.STRING, allowNull: false },
 date_invoice: { type: DataTypes.DATE, allowNull: false },
 payed: { type: DataTypes.BOOLEAN, allowNull: false },
 processed: { type: DataTypes.BOOLEAN, allowNull: false },
 process_date: { type: DataTypes.DATE, allowNull: false },
 status_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '5' },
 carrier: { type: DataTypes.STRING, allowNull: false },
 carrier_link: { type: DataTypes.STRING, allowNull: false },
 carrier_tracking: { type: DataTypes.STRING, allowNull: false },
 guest: { type: DataTypes.BOOLEAN, allowNull: false },
 pl_multitax_array: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'orders_return',
    timestamps: false,
  });

  ordersReturn.associate = (models) => {
    // Sin asociaciones
  };

  return ordersReturn;
};
