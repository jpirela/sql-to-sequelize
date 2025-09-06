// api/models/orders_suppliers.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ordersSuppliers = sequelize.define('ordersSuppliers', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_supplier: { type: DataTypes.INTEGER, allowNull: false },
 code_sup_order: { type: DataTypes.STRING, allowNull: false },
 id_order_client: { type: DataTypes.INTEGER, allowNull: false },
 id_product: { type: DataTypes.INTEGER, allowNull: false },
 id_attribute: { type: DataTypes.INTEGER, allowNull: false },
 id_option: { type: DataTypes.INTEGER, allowNull: false },
 qta: { type: DataTypes.INTEGER, allowNull: false },
 data: { type: DataTypes.DATE, allowNull: false },
 data_client: { type: DataTypes.DATE, allowNull: false },
 schedule: { type: DataTypes.DATE, allowNull: false },
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
 billing_address: { type: DataTypes.STRING, allowNull: false },
 shipping_address: { type: DataTypes.STRING, allowNull: false },
 code_order: { type: DataTypes.STRING, allowNull: false },
 payed: { type: DataTypes.BOOLEAN, allowNull: false },
 processed: { type: DataTypes.BOOLEAN, allowNull: false },
 shipped: { type: DataTypes.BOOLEAN, allowNull: false },
 ordered: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 process_date: { type: DataTypes.DATE, allowNull: false },
 shipping_date: { type: DataTypes.DATE, allowNull: false },
 id_carrier: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
 carrier: { type: DataTypes.STRING, allowNull: false },
 carrier_link: { type: DataTypes.STRING, allowNull: false },
 carrier_tracking: { type: DataTypes.STRING, allowNull: false },
 guest: { type: DataTypes.BOOLEAN, allowNull: false },
 pl_multitax_array: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'orders_suppliers',
    timestamps: false,
  });

  ordersSuppliers.associate = (models) => {
    // Sin asociaciones
  };

  return ordersSuppliers;
};
