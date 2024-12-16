'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // One city can have many airports
      City.hasMany(models.Airport, {
        foreignKey: 'cityId', // Matches the foreign key in the Airport model
        onDelete: "CASCADE", // Deletes airports when a city is deleted
        onUpdate: "CASCADE", // Updates airports when city ID changes
      });
    }
  }
  City.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};