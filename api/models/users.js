// api/models/users.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const users = sequelize.define('users', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 username: { type: DataTypes.STRING, unique: true, allowNull: false },
 email: { type: DataTypes.STRING, unique: true, allowNull: false },
 password_hash: { type: DataTypes.STRING, allowNull: false },
 status: { type: DataTypes.STRING, defaultValue: 'active' },
 created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  users.associate = (models) => {
    users.hasOne(models.userProfiles, {
      foreignKey: 'user_id',
      as: 'usersuserProfiles',
    });
    users.belongsToMany(models.roles, {
      through: 'user_roles',
      foreignKey: 'user_id',
      otherKey: 'role_id',
      as: 'usersroless',
    });
    users.hasMany(models.products, {
      foreignKey: 'created_by',
      as: 'usersproductss',
    });
    users.hasMany(models.orders, {
      foreignKey: 'user_id',
      as: 'usersorderss',
    });
  };

  return users;
};
