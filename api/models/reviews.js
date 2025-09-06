// api/models/reviews.js
import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const reviews = sequelize.define('reviews', {
 id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
 id_product: { type: DataTypes.INTEGER, allowNull: false },
 id_client: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 name: { type: DataTypes.STRING, allowNull: false },
 email: { type: DataTypes.STRING, allowNull: false },
 location: { type: DataTypes.STRING, defaultValue: '' },
 reviews_rating: { type: DataTypes.INTEGER, defaultValue: 'NULL' },
 reviews_text: { type: DataTypes.STRING, allowNull: false },
 approved: { type: DataTypes.INTEGER, allowNull: false, defaultValue: '0' },
 created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
 updated_at: { type: DataTypes.DATE, defaultValue: 'NULL' },
  }, {
    tableName: 'reviews',
    timestamps: true,
  });

  reviews.associate = (models) => {
    reviews.belongsTo(models.clients, {
      foreignKey: 'id_client',
      as: 'clients',
    });
    reviews.belongsTo(models.products, {
      foreignKey: 'id_product',
      as: 'products',
    });
  };

  return reviews;
};
