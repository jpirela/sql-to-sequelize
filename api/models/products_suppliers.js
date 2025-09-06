// api/models/products_suppliers.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const productsSuppliers = sequelize.define('productsSuppliers', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_product: { type: DataTypes.INTEGER, allowNull: false },
 id_supplier: { type: DataTypes.INTEGER, allowNull: false },
 description: { type: DataTypes.STRING, allowNull: false },
 price: { type: DataTypes.DECIMAL, allowNull: false },
 by_asign: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
  }, {
    tableName: 'products_suppliers',
    timestamps: false,
  });

  productsSuppliers.associate = (models) => {
    // Sin asociaciones
  };

  return productsSuppliers;
};
