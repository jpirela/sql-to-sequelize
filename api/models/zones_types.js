// api/models/zones_types.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const zonesTypes = sequelize.define('zonesTypes', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 id_carrier: { type: DataTypes.INTEGER, allowNull: false },
 id_zone_rate: { type: DataTypes.INTEGER, allowNull: false },
 surcharge_fuel: { type: DataTypes.DECIMAL, allowNull: false },
 insurance: { type: DataTypes.DECIMAL, allowNull: false },
 cash_on_delivery: { type: DataTypes.DECIMAL, allowNull: false },
 cash_on_delivery_min: { type: DataTypes.DECIMAL, allowNull: false },
 borders_costs: { type: DataTypes.DECIMAL, allowNull: false },
 kg_cubic_meter: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'zones_types',
    timestamps: false,
  });

  zonesTypes.associate = (models) => {
    zonesTypes.belongsTo(models.carriers, {
      foreignKey: 'id_carrier',
      as: 'carriers',
    });
    zonesTypes.belongsTo(models.zoneRates, {
      foreignKey: 'id_zone_rate',
      as: 'zoneRates',
    });
    zonesTypes.hasMany(models.carriersRates, {
      foreignKey: 'id_zone_type',
      as: 'carriersRates',
    });
  };

  return zonesTypes;
};
