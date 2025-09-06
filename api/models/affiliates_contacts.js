// api/models/affiliates_contacts.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const affiliatesContacts = sequelize.define('affiliatesContacts', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_affiliate: { type: DataTypes.INTEGER, allowNull: false },
 type_biz: { type: DataTypes.STRING, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 web_link: { type: DataTypes.STRING, defaultValue: 'NULL' },
 email: { type: DataTypes.STRING, allowNull: false },
 address: { type: DataTypes.STRING, allowNull: false },
 zipcode: { type: DataTypes.STRING, allowNull: false },
 city: { type: DataTypes.STRING, allowNull: false },
 country: { type: DataTypes.STRING, allowNull: false },
 lat: { type: DataTypes.STRING, allowNull: false },
 lng: { type: DataTypes.STRING, allowNull: false },
 phone: { type: DataTypes.STRING, allowNull: false },
 mobile: { type: DataTypes.STRING, allowNull: false },
 contact: { type: DataTypes.STRING, defaultValue: 'NULL' },
 contact_dept: { type: DataTypes.STRING, defaultValue: 'NULL' },
 contact_email: { type: DataTypes.STRING, defaultValue: 'NULL' },
 contact_phone: { type: DataTypes.STRING, defaultValue: 'NULL' },
 contact_mobile: { type: DataTypes.STRING, defaultValue: 'NULL' },
 status_visit: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '33' },
 active: { type: DataTypes.BOOLEAN, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'affiliates_contacts',
    timestamps: true,
  });

  affiliatesContacts.associate = (models) => {
    affiliatesContacts.belongsTo(models.affiliates, {
      foreignKey: 'id_affiliate',
      as: 'affiliates',
    });
  };

  return affiliatesContacts;
};
