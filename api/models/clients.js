// api/models/clients.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const clients = sequelize.define('clients', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_affiliate: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 id_store: { type: DataTypes.INTEGER, allowNull: false },
 via: { type: DataTypes.STRING, defaultValue: 'NULL' },
 accounting_plan: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 is_company: { type: DataTypes.BOOLEAN, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 lastname: { type: DataTypes.STRING, allowNull: false },
 tax_code: { type: DataTypes.STRING, allowNull: false },
 email: { type: DataTypes.STRING, allowNull: false },
 amz_email: { type: DataTypes.STRING, allowNull: false },
 phone: { type: DataTypes.STRING, allowNull: false },
 fax: { type: DataTypes.STRING, allowNull: false },
 road: { type: DataTypes.STRING, allowNull: false },
 address: { type: DataTypes.STRING, allowNull: false },
 zipcode: { type: DataTypes.STRING, allowNull: false },
 idcity: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 city: { type: DataTypes.STRING, allowNull: false },
 user: { type: DataTypes.STRING, allowNull: false },
 password: { type: DataTypes.STRING, allowNull: false },
 enabled: { type: DataTypes.BOOLEAN, allowNull: false },
 level: { type: DataTypes.BOOLEAN, allowNull: false },
 date_client: { type: DataTypes.DATE, allowNull: false },
 privacy: { type: DataTypes.BOOLEAN, allowNull: false },
 advertising: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '0' },
 send: { type: DataTypes.BOOLEAN, allowNull: false },
  }, {
    tableName: 'clients',
    timestamps: false,
  });

  clients.associate = (models) => {
    clients.belongsTo(models.clients, {
      foreignKey: 'id_affiliate',
      as: 'clients',
    });
    clients.belongsTo(models.stores, {
      foreignKey: 'id_store',
      as: 'stores',
    });
    clients.hasMany(models.carts, {
      foreignKey: 'id_client',
      as: 'carts',
    });
    clients.hasMany(models.clientsAddress, {
      foreignKey: 'id_client',
      as: 'clientsAddress',
    });
    clients.hasMany(models.orders, {
      foreignKey: 'id_client',
      as: 'orders',
    });
    clients.hasMany(models.reviews, {
      foreignKey: 'id_client',
      as: 'reviews',
    });
  };

  return clients;
};
