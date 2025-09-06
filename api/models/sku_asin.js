// api/models/sku_asin.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const skuAsin = sequelize.define('skuAsin', {
 sku: { type: DataTypes.STRING, defaultValue: 'NULL' },
 asin: { type: DataTypes.STRING, defaultValue: 'NULL' },
  }, {
    tableName: 'sku_asin',
    timestamps: false,
  });

  skuAsin.associate = (models) => {
    // Sin asociaciones
  };

  return skuAsin;
};
