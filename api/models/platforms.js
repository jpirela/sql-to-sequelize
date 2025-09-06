// api/models/platforms.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const platforms = sequelize.define('platforms', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 code: { type: DataTypes.STRING, defaultValue: 'NULL' },
 name: { type: DataTypes.STRING, allowNull: false },
 description: { type: DataTypes.STRING },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'platforms',
    timestamps: true,
  });

  platforms.associate = (models) => {
    platforms.hasMany(models.orders, {
      foreignKey: 'id_platform',
      as: 'orders',
    });
  };

  return platforms;
};
