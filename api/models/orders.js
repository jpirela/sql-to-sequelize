// api/models/orders.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const orders = sequelize.define('orders', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_client: { type: DataTypes.INTEGER, allowNull: false },
 id_store: { type: DataTypes.INTEGER, allowNull: false },
 id_platform: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 date: { type: DataTypes.DATE, allowNull: false },
 schedule: { type: DataTypes.DATE, allowNull: false },
 session_client: { type: DataTypes.STRING, defaultValue: 'NULL' },
 ip_client: { type: DataTypes.STRING, defaultValue: 'NULL' },
 subtotal: { type: DataTypes.DECIMAL, allowNull: false },
 grandtotal: { type: DataTypes.DECIMAL, allowNull: false },
 tax: { type: DataTypes.DECIMAL, allowNull: false },
 shipping_price: { type: DataTypes.DECIMAL, allowNull: false },
 payment_method: { type: DataTypes.STRING, allowNull: false },
 paypal_status: { type: DataTypes.STRING, allowNull: false },
 paypal_id_transaction: { type: DataTypes.STRING, allowNull: false },
 amazon_id_order: { type: DataTypes.STRING, allowNull: false },
 paypal_email_client: { type: DataTypes.STRING, allowNull: false },
 paypal_array: { type: DataTypes.STRING, allowNull: false },
 payment_price: { type: DataTypes.DECIMAL, allowNull: false },
 payment_advance: { type: DataTypes.DECIMAL, allowNull: false },
 billing_address: { type: DataTypes.STRING, allowNull: false },
 shipping_address: { type: DataTypes.STRING, allowNull: false },
 notes: { type: DataTypes.STRING, defaultValue: 'NULL' },
 coupon: { type: DataTypes.STRING, allowNull: false },
 discount_coupon: { type: DataTypes.DECIMAL, allowNull: false },
 code_order: { type: DataTypes.STRING, allowNull: false },
 payed: { type: DataTypes.BOOLEAN, allowNull: false },
 processed: { type: DataTypes.BOOLEAN, allowNull: false },
 commission: { type: DataTypes.BOOLEAN, allowNull: false },
 invoiced: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '0' },
 process_date: { type: DataTypes.DATE, allowNull: false },
 status_order: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '5' },
 carrier: { type: DataTypes.STRING, allowNull: false },
 carrier_link: { type: DataTypes.STRING, allowNull: false },
 carrier_tracking: { type: DataTypes.STRING, allowNull: false },
 platform: { type: DataTypes.STRING, defaultValue: 'NULL' },
 order_platform: { type: DataTypes.STRING, defaultValue: 'NULL' },
 is_prime: { type: DataTypes.STRING, defaultValue: 'NULL' },
 promise_date: { type: DataTypes.DATE, allowNull: false },
 guest: { type: DataTypes.BOOLEAN, allowNull: false },
 pl_multitax_array: { type: DataTypes.STRING, allowNull: false },
 revised: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '0' },
 followup_date: { type: DataTypes.DATE, allowNull: false },
 followup_notes: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'orders',
    timestamps: true,
  });

  orders.associate = (models) => {
    orders.belongsTo(models.clients, {
      foreignKey: 'id_client',
      as: 'clients',
    });
    orders.belongsTo(models.platforms, {
      foreignKey: 'id_platform',
      as: 'platforms',
    });
    orders.belongsTo(models.stores, {
      foreignKey: 'id_store',
      as: 'stores',
    });
    orders.hasMany(models.ordersProducts, {
      foreignKey: 'id_order',
      as: 'ordersProducts',
    });
  };

  return orders;
};
