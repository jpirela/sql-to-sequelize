// api/models/test_table.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const testTable = sequelize.define('testTable', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, unique: true, allowNull: false },
 status: { type: DataTypes.STRING, defaultValue: 'active' },
 count_field: { type: DataTypes.INTEGER, defaultValue: 0 },
 is_enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
 created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'test_table',
    timestamps: false,
  });

  testTable.associate = (models) => {
    // Sin asociaciones
  };

  return testTable;
};
