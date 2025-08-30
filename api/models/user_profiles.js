// api/models/user_profiles.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const userProfiles = sequelize.define('userProfiles', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 user_id: { type: DataTypes.INTEGER, unique: true, allowNull: false },
 first_name: { type: DataTypes.STRING },
 last_name: { type: DataTypes.STRING },
 bio: { type: DataTypes.STRING },
 avatar_url: { type: DataTypes.STRING },
 phone: { type: DataTypes.STRING },
 created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'user_profiles',
    timestamps: true,
  });

  userProfiles.associate = (models) => {
    userProfiles.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'userProfilesusers',
    });
  };

  return userProfiles;
};
