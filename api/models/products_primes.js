// api/models/products_primes.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const productsPrimes = sequelize.define('productsPrimes', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_product: { type: DataTypes.INTEGER, allowNull: false },
 id_product_attribute: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 id_product_option: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 ean_code: { type: DataTypes.STRING, defaultValue: 'NULL' },
 export: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
 manufacture: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 final: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 visible: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: '1' },
 parent: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'products_primes',
    timestamps: true,
  });

  productsPrimes.associate = (models) => {
    productsPrimes.belongsTo(models.productsAttributes, {
      foreignKey: 'id_product_attribute',
      as: 'productsAttributes',
    });
    productsPrimes.belongsTo(models.productsOptions, {
      foreignKey: 'id_product_option',
      as: 'productsOptions',
    });
    productsPrimes.belongsTo(models.products, {
      foreignKey: 'id_product',
      as: 'products',
    });
    productsPrimes.hasMany(models.carts, {
      foreignKey: 'id_product_variant',
      as: 'carts',
    });
    productsPrimes.hasMany(models.ordersProducts, {
      foreignKey: 'id_product_variant',
      as: 'ordersProducts',
    });
  };

  return productsPrimes;
};
