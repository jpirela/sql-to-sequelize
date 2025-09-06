// api/models/options.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const options = sequelize.define('options', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 utilities: { type: DataTypes.STRING, allowNull: false },
 caption: { type: DataTypes.STRING, allowNull: false },
 observations: { type: DataTypes.STRING, allowNull: false },
 id_category: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 position: { type: DataTypes.INTEGER, allowNull: false },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'options',
    timestamps: true,
  });

  options.associate = (models) => {
    options.belongsTo(models.categories, {
      foreignKey: 'id_category',
      as: 'categories',
    });
    options.hasMany(models.optionsValues, {
      foreignKey: 'id_option',
      as: 'optionsValues',
    });
  };

  return options;
};
