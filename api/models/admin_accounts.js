// api/models/admin_accounts.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const adminAccounts = sequelize.define('adminAccounts', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 id_store: { type: DataTypes.INTEGER, allowNull: false },
 user: { type: DataTypes.STRING, allowNull: false },
 password: { type: DataTypes.STRING, allowNull: false },
 email: { type: DataTypes.STRING, defaultValue: '' },
 admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '0' },
 super_admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '0' },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'admin_accounts',
    timestamps: true,
  });

  adminAccounts.associate = (models) => {
    adminAccounts.belongsTo(models.stores, {
      foreignKey: 'id_store',
      as: 'stores',
    });
  };

  return adminAccounts;
};
