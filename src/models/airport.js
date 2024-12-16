'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // multiple airports belongs to one city
      this.belongsTo(models.City, {
        foreignKey: 'cityId',
        onDelete: "CASCADE",
      });

      // A Airport can have many departing and arriving flights
      this.hasMany(models.Flight, {
        foreignKey: 'departureAirportCode', // Flights departing from this airport
        onDelete: "CASCADE",
      });

      this.hasMany(models.Flight, {
        foreignKey: 'arrivalAirportCode', // Flights arriving at this airport
        onDelete: "CASCADE",
      });
      
    }
  }
  Airport.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [2, 10],
      },
    },
    address: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [5, 255],
      },
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};