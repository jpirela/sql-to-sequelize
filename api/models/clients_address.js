// api/models/clients_address.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const clientsAddress = sequelize.define('clientsAddress', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_client: { type: DataTypes.INTEGER, allowNull: false },
 phone: { type: DataTypes.STRING, allowNull: false },
 fax: { type: DataTypes.STRING, allowNull: false },
 address: { type: DataTypes.STRING, allowNull: false },
 zipcode: { type: DataTypes.STRING, allowNull: false },
 city: { type: DataTypes.STRING, allowNull: false },
 main: { type: DataTypes.BOOLEAN, allowNull: false },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
  }, {
    tableName: 'clients_address',
    timestamps: false,
  });

  clientsAddress.associate = (models) => {
    clientsAddress.belongsTo(models.clients, {
      foreignKey: 'id_client',
      as: 'clients',
    });
  };

  return clientsAddress;
};
