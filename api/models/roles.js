// api/models/roles.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const roles = sequelize.define('roles', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, unique: true, allowNull: false },
 description: { type: DataTypes.STRING },
 created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'roles',
    timestamps: true,
  });

  roles.associate = (models) => {
    roles.belongsToMany(models.users, {
      through: 'user_roles',
      foreignKey: 'role_id',
      otherKey: 'user_id',
      as: 'rolesuserss',
    });
  };

  return roles;
};
