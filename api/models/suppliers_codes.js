// api/models/suppliers_codes.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const suppliersCodes = sequelize.define('suppliersCodes', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_supplier: { type: DataTypes.INTEGER, allowNull: false },
 id_carrier: { type: DataTypes.INTEGER, allowNull: false },
 description: { type: DataTypes.STRING, allowNull: false },
 code_shipping: { type: DataTypes.STRING, allowNull: false },
 code_control: { type: DataTypes.INTEGER, allowNull: false },
 code_franchise: { type: DataTypes.STRING, allowNull: false },
 image_url: { type: DataTypes.STRING, defaultValue: 'NULL' },
 html_url: { type: DataTypes.STRING, defaultValue: 'NULL' },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '0' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'suppliers_codes',
    timestamps: true,
  });

  suppliersCodes.associate = (models) => {
    suppliersCodes.belongsTo(models.carriers, {
      foreignKey: 'id_carrier',
      as: 'carriers',
    });
    suppliersCodes.belongsTo(models.suppliers, {
      foreignKey: 'id_supplier',
      as: 'suppliers',
    });
  };

  return suppliersCodes;
};
