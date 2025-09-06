// api/models/affiliates.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const affiliates = sequelize.define('affiliates', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 type: { type: DataTypes.STRING, allowNull: false },
 commissions: { type: DataTypes.DECIMAL, allowNull: false },
 web_link: { type: DataTypes.STRING, allowNull: false },
 tax_code: { type: DataTypes.STRING, allowNull: false },
 email: { type: DataTypes.STRING, allowNull: false },
 phone: { type: DataTypes.STRING, allowNull: false },
 mobile: { type: DataTypes.STRING, allowNull: false },
 payment_method: { type: DataTypes.STRING, allowNull: false },
 payment_entity: { type: DataTypes.STRING, allowNull: false },
 payment_data: { type: DataTypes.STRING, allowNull: false },
 address: { type: DataTypes.STRING, allowNull: false },
 zipcode: { type: DataTypes.STRING, allowNull: false },
 city: { type: DataTypes.STRING, allowNull: false },
 country: { type: DataTypes.STRING, allowNull: false },
 user: { type: DataTypes.STRING, allowNull: false },
 password: { type: DataTypes.STRING, allowNull: false },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'affiliates',
    timestamps: true,
  });

  affiliates.associate = (models) => {
    affiliates.hasMany(models.affiliatesContacts, {
      foreignKey: 'id_affiliate',
      as: 'affiliatesContacts',
    });
    affiliates.hasMany(models.affiliatesZones, {
      foreignKey: 'id_affiliate',
      as: 'affiliatesZones',
    });
  };

  return affiliates;
};
