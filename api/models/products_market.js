// api/models/products_market.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const productsMarket = sequelize.define('productsMarket', {
 id_o: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
 id_category: { type: DataTypes.INTEGER, allowNull: false },
 id_product: { type: DataTypes.INTEGER, allowNull: false },
 id_attribute: { type: DataTypes.INTEGER, allowNull: false },
 id_option: { type: DataTypes.INTEGER, allowNull: false },
 sku: { type: DataTypes.INTEGER, allowNull: false },
 sku_parent: { type: DataTypes.STRING, allowNull: false },
 sku_lwc: { type: DataTypes.STRING, allowNull: false },
 attribute_name: { type: DataTypes.STRING, allowNull: false },
 attribute_value: { type: DataTypes.STRING, allowNull: false },
 export: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
  }, {
    tableName: 'products_market',
    timestamps: false,
  });

  productsMarket.associate = (models) => {
    // Sin asociaciones
  };

  return productsMarket;
};
