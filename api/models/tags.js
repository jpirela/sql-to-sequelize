// api/models/tags.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const tags = sequelize.define('tags', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.STRING, unique: true, allowNull: false },
 color: { type: DataTypes.STRING, defaultValue: '#000000' },
 created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    tableName: 'tags',
    timestamps: true,
  });

  tags.associate = (models) => {
    tags.belongsToMany(models.products, {
      through: 'product_tags',
      foreignKey: 'tag_id',
      otherKey: 'product_id',
      as: 'tagsproductss',
    });
  };

  return tags;
};
