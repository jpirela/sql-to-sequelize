// api/models/affiliates_zones.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const affiliatesZones = sequelize.define('affiliatesZones', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_affiliate: { type: DataTypes.INTEGER, allowNull: false },
 comunidad: { type: DataTypes.STRING, allowNull: false },
 provincia: { type: DataTypes.STRING, allowNull: false },
 poblacion: { type: DataTypes.STRING, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'affiliates_zones',
    timestamps: true,
  });

  affiliatesZones.associate = (models) => {
    affiliatesZones.belongsTo(models.affiliates, {
      foreignKey: 'id_affiliate',
      as: 'affiliates',
    });
  };

  return affiliatesZones;
};
