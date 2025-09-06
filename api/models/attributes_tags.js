// api/models/attributes_tags.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const attributesTags = sequelize.define('attributesTags', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_product: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 id_attribute_value: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 id_attr_tag: { type: DataTypes.INTEGER, allowNull: false },
 show_tag: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 show_pral: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '0' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'attributes_tags',
    timestamps: true,
  });

  attributesTags.associate = (models) => {
    attributesTags.belongsTo(models.products, {
      foreignKey: 'id_product',
      as: 'products',
    });
  };

  return attributesTags;
};
