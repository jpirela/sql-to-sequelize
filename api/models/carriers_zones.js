// api/models/carriers_zones.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const carriersZones = sequelize.define('carriersZones', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_zone_type: { type: DataTypes.INTEGER, allowNull: false },
 id_carrier: { type: DataTypes.INTEGER, allowNull: false },
 id_zone_rate: { type: DataTypes.INTEGER, allowNull: false },
 id_location: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 zone_location: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'carriers_zones',
    timestamps: false,
  });

  carriersZones.associate = (models) => {
    // Sin asociaciones
  };

  return carriersZones;
};
