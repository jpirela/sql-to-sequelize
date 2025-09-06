// api/models/options_values.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const optionsValues = sequelize.define('optionsValues', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_option: { type: DataTypes.INTEGER, allowNull: false },
 value: { type: DataTypes.STRING, allowNull: false },
 extra_price: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: '0.00' },
 position: { type: DataTypes.INTEGER, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'options_values',
    timestamps: true,
  });

  optionsValues.associate = (models) => {
    optionsValues.belongsTo(models.options, {
      foreignKey: 'id_option',
      as: 'options',
    });
    optionsValues.hasMany(models.productsOptions, {
      foreignKey: 'id_option_value',
      as: 'productsOptions',
    });
  };

  return optionsValues;
};
