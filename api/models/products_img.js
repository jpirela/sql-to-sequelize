// api/models/products_img.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const productsImg = sequelize.define('productsImg', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_product: { type: DataTypes.INTEGER, allowNull: false },
 img: { type: DataTypes.STRING, allowNull: false },
 rank: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'products_img',
    timestamps: false,
  });

  productsImg.associate = (models) => {
    productsImg.belongsTo(models.products, {
      foreignKey: 'id_product',
      as: 'products',
    });
  };

  return productsImg;
};
