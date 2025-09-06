// api/models/carts_options.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const cartsOptions = sequelize.define('cartsOptions', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_cart: { type: DataTypes.INTEGER, allowNull: false },
 id_product_option: { type: DataTypes.INTEGER, allowNull: false },
 quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '1' },
 price_extra: { type: DataTypes.DECIMAL, allowNull: false, defaultValue: '0.00' },
  }, {
    tableName: 'carts_options',
    timestamps: false,
  });

  cartsOptions.associate = (models) => {
    cartsOptions.belongsTo(models.carts, {
      foreignKey: 'id_cart',
      as: 'carts',
    });
    cartsOptions.belongsTo(models.productsOptions, {
      foreignKey: 'id_product_option',
      as: 'productsOptions',
    });
  };

  return cartsOptions;
};
