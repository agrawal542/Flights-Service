'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
    await queryInterface.addConstraint('Airports', {
      fields: ['cityId'], // Specify the column
      type: 'foreign key', // Correct type with a space
      name: 'fk_city_airports', // Optional: Custom constraint name
      references: {
        table: 'Cities', // Name of the referenced table
        field: 'id', // Referenced column
      },
      onDelete: 'CASCADE', // Optional: Specify behavior on deletion
      onUpdate: 'CASCADE', // Optional: Specify behavior on update
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
    await queryInterface.removeConstraint('Airports', 'fk_city_airports'); // Use the same constraint name
  },
};
