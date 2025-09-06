// api/models/attr_tags.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const attrTags = sequelize.define('attrTags', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 title: { type: DataTypes.STRING, allowNull: false },
 utilities: { type: DataTypes.STRING, allowNull: false },
 id_category: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 value: { type: DataTypes.STRING, allowNull: false },
 description: { type: DataTypes.STRING, allowNull: false },
 color: { type: DataTypes.STRING, allowNull: false },
 img: { type: DataTypes.STRING, allowNull: false },
 url: { type: DataTypes.STRING, defaultValue: '' },
 position: { type: DataTypes.INTEGER, allowNull: false },
 show: { type: DataTypes.BOOLEAN, allowNull: false },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'attr_tags',
    timestamps: true,
  });

  attrTags.associate = (models) => {
    attrTags.belongsTo(models.categories, {
      foreignKey: 'id_category',
      as: 'categories',
    });
  };

  return attrTags;
};
