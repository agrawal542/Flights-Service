'use strict';

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: 'airbusA320neo',
        capacity: 186,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: 'airbusA321neo',
        capacity: 240,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: 'airbusA320ceo',
        capacity: 180,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: 'boeing737-800',
        capacity: 189,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: 'boeing737MAX8',
        capacity: 189,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: 'boeing737MAX200',
        capacity: 197,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: 'atr72-600',
        capacity: 72,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);    
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('Airplanes', {
      [Op.or]: [
        { modelNumber: 'airbus320' },
        { modelNumber: 'airbus380' }
      ]
    });
  }
};
