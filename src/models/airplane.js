'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // one airplane can have multiple flights
      this.hasMany(models.Flight, {
        foreignKey: 'airplaneId', // Matches   the foreign key in the Airport model
        onDelete: "CASCADE", // Deletes airports when a city is deleted
      });
      this.hasMany(models.Seat, {
        foreignKey: 'airplaneId', // Matches   the foreign key in the Airport model
        onDelete: "CASCADE", // Deletes airports when a city is deleted
      });
    }
  }
  Airplane.init({
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 1000
      },
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};