// api/models/invoice_detail.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const invoiceDetail = sequelize.define('invoiceDetail', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 code_union: { type: DataTypes.INTEGER, allowNull: false },
 id_supplier: { type: DataTypes.INTEGER, allowNull: false },
 name_supplier: { type: DataTypes.STRING, allowNull: false },
 code_order: { type: DataTypes.STRING, allowNull: false },
 code_supp: { type: DataTypes.STRING, allowNull: false },
 date_order: { type: DataTypes.DATE, allowNull: false },
 date_schedule: { type: DataTypes.DATE, allowNull: false },
 line_supp: { type: DataTypes.INTEGER, allowNull: false },
 name_line: { type: DataTypes.STRING, allowNull: false },
 notes_line: { type: DataTypes.STRING, allowNull: false },
 model_line: { type: DataTypes.STRING, allowNull: false },
 qta_line: { type: DataTypes.DECIMAL, allowNull: false },
 price_line: { type: DataTypes.DECIMAL, allowNull: false },
 subtotal_line: { type: DataTypes.DECIMAL, allowNull: false },
  }, {
    tableName: 'invoice_detail',
    timestamps: false,
  });

  invoiceDetail.associate = (models) => {
    // Sin asociaciones
  };

  return invoiceDetail;
};
