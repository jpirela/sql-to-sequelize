// api/models/user_roles.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const userRoles = sequelize.define('userRoles', {
 user_id: { type: DataTypes.INTEGER, primaryKey: true },
 role_id: { type: DataTypes.INTEGER, primaryKey: true },
 assigned_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'user_roles',
    timestamps: false,
  });

  userRoles.associate = (models) => {
    // Sin asociaciones
  };

  return userRoles;
};
