// api/models/products_rename.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const productsRename = sequelize.define('productsRename', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_product: { type: DataTypes.INTEGER, allowNull: false },
 re_name: { type: DataTypes.STRING, allowNull: false },
 file_name: { type: DataTypes.STRING, allowNull: false },
 images: { type: DataTypes.STRING, allowNull: false },
 url_image: { type: DataTypes.STRING, allowNull: false },
 description: { type: DataTypes.STRING, allowNull: false },
 categories: { type: DataTypes.STRING, allowNull: false },
 price_with_tax: { type: DataTypes.BOOLEAN, allowNull: false },
 comments: { type: DataTypes.STRING },
 add_data: { type: DataTypes.DATE, allowNull: false },
 by_exposure: { type: DataTypes.BOOLEAN, allowNull: false },
 meta_title: { type: DataTypes.STRING, allowNull: false },
 meta_keywords: { type: DataTypes.STRING, allowNull: false },
 meta_description: { type: DataTypes.STRING, allowNull: false },
 price_catalog: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: '1.00' },
 marked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '0' },
 visible: { type: DataTypes.BOOLEAN, allowNull: false },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 showcase: { type: DataTypes.BOOLEAN, allowNull: false },
  }, {
    tableName: 'products_rename',
    timestamps: false,
  });

  productsRename.associate = (models) => {
    // Sin asociaciones
  };

  return productsRename;
};
