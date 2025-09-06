// api/models/stores.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const stores = sequelize.define('stores', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 short_name: { type: DataTypes.STRING, allowNull: false },
 is_company: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 tax_code: { type: DataTypes.STRING, allowNull: false },
 code_shipping: { type: DataTypes.STRING, allowNull: false },
 code_control: { type: DataTypes.STRING, allowNull: false },
 email: { type: DataTypes.STRING, allowNull: false },
 phone: { type: DataTypes.STRING, allowNull: false },
 fax: { type: DataTypes.STRING, allowNull: false },
 address: { type: DataTypes.STRING, allowNull: false },
 zipcode: { type: DataTypes.STRING, allowNull: false },
 city: { type: DataTypes.STRING, allowNull: false },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'stores',
    timestamps: true,
  });

  stores.associate = (models) => {
    stores.hasMany(models.adminAccounts, {
      foreignKey: 'id_store',
      as: 'adminAccounts',
    });
    stores.hasMany(models.carts, {
      foreignKey: 'id_store',
      as: 'carts',
    });
    stores.hasOne(models.clients, {
      foreignKey: 'id_store',
      as: 'clients',
    });
    stores.hasMany(models.orders, {
      foreignKey: 'id_store',
      as: 'orders',
    });
    stores.hasOne(models.storesSettings, {
      foreignKey: 'id_store',
      as: 'storesSettings',
    });
  };

  return stores;
};
