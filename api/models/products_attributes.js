// api/models/products_attributes.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const productsAttributes = sequelize.define('productsAttributes', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_product: { type: DataTypes.INTEGER, allowNull: false },
 id_attribute_value1: { type: DataTypes.INTEGER, allowNull: false },
 id_attribute_value2: { type: DataTypes.INTEGER, allowNull: false },
 img_index1: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
 img_index2: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
 weight: { type: DataTypes.DECIMAL, allowNull: false },
 weight_2: { type: DataTypes.DECIMAL, allowNull: false },
 weight_pack: { type: DataTypes.DECIMAL, allowNull: false },
 width: { type: DataTypes.DECIMAL, allowNull: false },
 width_pack: { type: DataTypes.DECIMAL, allowNull: false },
 length: { type: DataTypes.DECIMAL, allowNull: false },
 length_pack: { type: DataTypes.DECIMAL, allowNull: false },
 height: { type: DataTypes.DECIMAL, allowNull: false },
 height_pack: { type: DataTypes.DECIMAL, allowNull: false },
 packages: { type: DataTypes.DECIMAL, allowNull: false },
 supplier: { type: DataTypes.INTEGER, allowNull: false },
 price: { type: DataTypes.DECIMAL, allowNull: false },
 margin: { type: DataTypes.DECIMAL, defaultValue: 'NULL' },
 offer: { type: DataTypes.DECIMAL, allowNull: false },
 materials: { type: DataTypes.DECIMAL, allowNull: false },
 cost: { type: DataTypes.DECIMAL, allowNull: false },
 point: { type: DataTypes.DECIMAL, allowNull: false },
 point_val: { type: DataTypes.DECIMAL, allowNull: false },
 disc: { type: DataTypes.INTEGER, allowNull: false },
 price_with_tax: { type: DataTypes.BOOLEAN, allowNull: false },
 cost_with_tax: { type: DataTypes.BOOLEAN, allowNull: false },
 notes_att: { type: DataTypes.STRING, defaultValue: 'NULL' },
 filter_left: { type: DataTypes.BOOLEAN, allowNull: false },
 as_filter: { type: DataTypes.BOOLEAN, allowNull: false },
 filter_body: { type: DataTypes.BOOLEAN, allowNull: false },
 porte: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: '0.00' },
 coste_pub: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: '0.00' },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'products_attributes',
    timestamps: true,
  });

  productsAttributes.associate = (models) => {
    productsAttributes.belongsTo(models.attributesValues, {
      foreignKey: 'id_attribute_value1',
      as: 'attributesValues',
    });
    productsAttributes.belongsTo(models.attributesValues, {
      foreignKey: 'id_attribute_value2',
      as: 'attributesValues',
    });
    productsAttributes.belongsTo(models.products, {
      foreignKey: 'id_product',
      as: 'products',
    });
    productsAttributes.hasMany(models.productsPrimes, {
      foreignKey: 'id_product_attribute',
      as: 'productsPrimes',
    });
  };

  return productsAttributes;
};
