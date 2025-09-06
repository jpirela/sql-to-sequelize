// api/models/stores_settings.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const storesSettings = sequelize.define('storesSettings', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_store: { type: DataTypes.INTEGER, allowNull: false },
 type: { type: DataTypes.STRING, allowNull: false },
 key: { type: DataTypes.STRING, allowNull: false },
 value: { type: DataTypes.STRING, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'stores_settings',
    timestamps: true,
  });

  storesSettings.associate = (models) => {
    storesSettings.belongsTo(models.stores, {
      foreignKey: 'id_store',
      as: 'stores',
    });
  };

  return storesSettings;
};
