// api/models/product_tags.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const productTags = sequelize.define('productTags', {
 product_id: { type: DataTypes.INTEGER, primaryKey: true },
 tag_id: { type: DataTypes.INTEGER, primaryKey: true },
  }, {
    tableName: 'product_tags',
    timestamps: false,
  });

  productTags.associate = (models) => {
    // Sin asociaciones
  };

  return productTags;
};
