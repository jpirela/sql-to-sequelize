// api/models/simple_junction.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const simpleJunction = sequelize.define('simpleJunction', {
 table1_id: { type: DataTypes.INTEGER, primaryKey: true },
 table2_id: { type: DataTypes.INTEGER, primaryKey: true },
  }, {
    tableName: 'simple_junction',
    timestamps: false,
  });

  simpleJunction.associate = (models) => {
    // Sin asociaciones
  };

  return simpleJunction;
};
