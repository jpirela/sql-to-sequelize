// api/models/carriers.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const carriers = sequelize.define('carriers', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 is_company: { type: DataTypes.BOOLEAN, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 short_name: { type: DataTypes.STRING, allowNull: false },
 tax_code: { type: DataTypes.STRING, allowNull: false },
 email: { type: DataTypes.STRING, allowNull: false },
 phone: { type: DataTypes.STRING, allowNull: false },
 fax: { type: DataTypes.STRING, allowNull: false },
 address: { type: DataTypes.STRING, allowNull: false },
 zipcode: { type: DataTypes.STRING, allowNull: false },
 city: { type: DataTypes.STRING, allowNull: false },
 url_tracking: { type: DataTypes.STRING, defaultValue: 'NULL' },
 url_logo: { type: DataTypes.STRING, defaultValue: '' },
 active: { type: DataTypes.BOOLEAN, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'carriers',
    timestamps: true,
  });

  carriers.associate = (models) => {
    carriers.hasMany(models.carriersRates, {
      foreignKey: 'id_carrier',
      as: 'carriersRates',
    });
    carriers.hasMany(models.suppliersCodes, {
      foreignKey: 'id_carrier',
      as: 'suppliersCodes',
    });
    carriers.hasMany(models.zonesTypes, {
      foreignKey: 'id_carrier',
      as: 'zonesTypes',
    });
  };

  return carriers;
};
