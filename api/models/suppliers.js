// api/models/suppliers.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const suppliers = sequelize.define('suppliers', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 is_company: { type: DataTypes.BOOLEAN, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 tax_code: { type: DataTypes.STRING, allowNull: false },
 code_shipping: { type: DataTypes.STRING, allowNull: false },
 code_control: { type: DataTypes.STRING, allowNull: false },
 email: { type: DataTypes.STRING, allowNull: false },
 phone: { type: DataTypes.STRING, allowNull: false },
 fax: { type: DataTypes.STRING, allowNull: false },
 address: { type: DataTypes.STRING, allowNull: false },
 zipcode: { type: DataTypes.STRING, allowNull: false },
 city: { type: DataTypes.STRING, allowNull: false },
 active: { type: DataTypes.BOOLEAN, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'suppliers',
    timestamps: true,
  });

  suppliers.associate = (models) => {
    suppliers.hasMany(models.productsOptions, {
      foreignKey: 'id_supplier',
      as: 'productsOptions',
    });
    suppliers.hasMany(models.suppliersCodes, {
      foreignKey: 'id_supplier',
      as: 'suppliersCodes',
    });
  };

  return suppliers;
};
