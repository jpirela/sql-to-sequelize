// api/models/settings.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const settings = sequelize.define('settings', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 type: { type: DataTypes.STRING, allowNull: false },
 key: { type: DataTypes.STRING, allowNull: false },
 value: { type: DataTypes.STRING, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'settings',
    timestamps: true,
  });

  settings.associate = (models) => {
    // Sin asociaciones
  };

  return settings;
};
