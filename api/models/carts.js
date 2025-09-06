// api/models/carts.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const carts = sequelize.define('carts', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_client: { type: DataTypes.INTEGER, allowNull: false },
 id_product_variant: { type: DataTypes.INTEGER, allowNull: false },
 id_store: { type: DataTypes.INTEGER, allowNull: false },
 packages: { type: DataTypes.INTEGER, allowNull: false },
 disc: { type: DataTypes.INTEGER, allowNull: false },
 quantity: { type: DataTypes.INTEGER, allowNull: false },
 price: { type: DataTypes.DECIMAL, allowNull: false },
 offert: { type: DataTypes.DECIMAL, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'carts',
    timestamps: true,
  });

  carts.associate = (models) => {
    carts.belongsTo(models.clients, {
      foreignKey: 'id_client',
      as: 'clients',
    });
    carts.belongsTo(models.productsPrimes, {
      foreignKey: 'id_product_variant',
      as: 'productsPrimes',
    });
    carts.belongsTo(models.stores, {
      foreignKey: 'id_store',
      as: 'stores',
    });
    carts.hasMany(models.cartsOptions, {
      foreignKey: 'id_cart',
      as: 'cartsOptions',
    });
  };

  return carts;
};
