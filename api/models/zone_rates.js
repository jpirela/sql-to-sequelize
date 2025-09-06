// api/models/zone_rates.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const zoneRates = sequelize.define('zoneRates', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 table_zone: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'zone_rates',
    timestamps: false,
  });

  zoneRates.associate = (models) => {
    zoneRates.hasMany(models.carriersRates, {
      foreignKey: 'id_zone_rate',
      as: 'carriersRates',
    });
    zoneRates.hasMany(models.zonesTypes, {
      foreignKey: 'id_zone_rate',
      as: 'zonesTypes',
    });
  };

  return zoneRates;
};
