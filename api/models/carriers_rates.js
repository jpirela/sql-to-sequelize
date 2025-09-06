// api/models/carriers_rates.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const carriersRates = sequelize.define('carriersRates', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_carrier: { type: DataTypes.INTEGER, allowNull: false },
 id_zone_type: { type: DataTypes.INTEGER, allowNull: false },
 id_zone_rate: { type: DataTypes.INTEGER, allowNull: false },
 up_to: { type: DataTypes.DECIMAL, allowNull: false },
 subprice: { type: DataTypes.DECIMAL, allowNull: false },
 fuel: { type: DataTypes.DECIMAL, allowNull: false },
 price: { type: DataTypes.DECIMAL, allowNull: false },
  }, {
    tableName: 'carriers_rates',
    timestamps: false,
  });

  carriersRates.associate = (models) => {
    carriersRates.belongsTo(models.carriers, {
      foreignKey: 'id_carrier',
      as: 'carriers',
    });
    carriersRates.belongsTo(models.zoneRates, {
      foreignKey: 'id_zone_rate',
      as: 'zoneRates',
    });
    carriersRates.belongsTo(models.zonesTypes, {
      foreignKey: 'id_zone_type',
      as: 'zonesTypes',
    });
  };

  return carriersRates;
};
