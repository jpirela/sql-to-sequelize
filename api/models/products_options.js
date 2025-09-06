// api/models/products_options.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const productsOptions = sequelize.define('productsOptions', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_product: { type: DataTypes.INTEGER, allowNull: false },
 id_option_value: { type: DataTypes.INTEGER, allowNull: false },
 id_supplier: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 weight: { type: DataTypes.DECIMAL, allowNull: false },
 width: { type: DataTypes.DECIMAL, allowNull: false },
 length: { type: DataTypes.DECIMAL, allowNull: false },
 height: { type: DataTypes.DECIMAL, allowNull: false },
 packages: { type: DataTypes.DECIMAL, allowNull: false },
 price: { type: DataTypes.DECIMAL, allowNull: false },
 offer: { type: DataTypes.DECIMAL, allowNull: false },
 material: { type: DataTypes.DECIMAL, allowNull: false },
 cost: { type: DataTypes.DECIMAL, allowNull: false },
 point: { type: DataTypes.DECIMAL, allowNull: false },
 val: { type: DataTypes.DECIMAL, allowNull: false },
 disc: { type: DataTypes.INTEGER, allowNull: false },
 price_with_tax: { type: DataTypes.BOOLEAN, allowNull: false },
 cost_with_tax: { type: DataTypes.BOOLEAN, allowNull: false },
 filter_left: { type: DataTypes.BOOLEAN, allowNull: false },
 as_filter: { type: DataTypes.BOOLEAN, allowNull: false },
 filter_body: { type: DataTypes.BOOLEAN, allowNull: false },
 t_elabora: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
 tipo_prime: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },
 is_prime: { type: DataTypes.BOOLEAN, allowNull: false },
 stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
  }, {
    tableName: 'products_options',
    timestamps: false,
  });

  productsOptions.associate = (models) => {
    productsOptions.belongsTo(models.optionsValues, {
      foreignKey: 'id_option_value',
      as: 'optionsValues',
    });
    productsOptions.belongsTo(models.products, {
      foreignKey: 'id_product',
      as: 'products',
    });
    productsOptions.belongsTo(models.suppliers, {
      foreignKey: 'id_supplier',
      as: 'suppliers',
    });
    productsOptions.hasMany(models.cartsOptions, {
      foreignKey: 'id_product_option',
      as: 'cartsOptions',
    });
    productsOptions.hasMany(models.ordersProductsOptions, {
      foreignKey: 'id_product_option',
      as: 'ordersProductsOptions',
    });
    productsOptions.hasMany(models.productsPrimes, {
      foreignKey: 'id_product_option',
      as: 'productsPrimes',
    });
  };

  return productsOptions;
};
