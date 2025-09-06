// api/models/products.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const products = sequelize.define('products', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 name: { type: DataTypes.STRING, allowNull: false },
 tag_extra: { type: DataTypes.STRING, allowNull: false },
 tag_extra_name: { type: DataTypes.STRING, allowNull: false },
 url_image: { type: DataTypes.STRING, allowNull: false },
 description: { type: DataTypes.STRING, allowNull: false },
 id_category: { type: DataTypes.INTEGER, allowNull: false },
 code: { type: DataTypes.STRING, allowNull: false },
 tax: { type: DataTypes.DECIMAL, allowNull: false },
 units: { type: DataTypes.STRING, allowNull: false },
 comments: { type: DataTypes.STRING },
 meta_title: { type: DataTypes.STRING, allowNull: false },
 meta_keywords: { type: DataTypes.STRING, allowNull: false },
 meta_description: { type: DataTypes.STRING, allowNull: false },
 marked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '0' },
 visible: { type: DataTypes.BOOLEAN, allowNull: false },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'products',
    timestamps: true,
  });

  products.associate = (models) => {
    products.belongsTo(models.categories, {
      foreignKey: 'id_category',
      as: 'categories',
    });
    products.hasMany(models.attributesTags, {
      foreignKey: 'id_product',
      as: 'attributesTags',
    });
    products.hasMany(models.productsAttributes, {
      foreignKey: 'id_product',
      as: 'productsAttributes',
    });
    products.hasMany(models.productsImg, {
      foreignKey: 'id_product',
      as: 'productsImgs',
    });
    products.hasMany(models.productsOptions, {
      foreignKey: 'id_product',
      as: 'productsOptions',
    });
    products.hasMany(models.productsPrimes, {
      foreignKey: 'id_product',
      as: 'productsPrimes',
    });
    products.hasMany(models.reviews, {
      foreignKey: 'id_product',
      as: 'reviews',
    });
  };

  return products;
};
