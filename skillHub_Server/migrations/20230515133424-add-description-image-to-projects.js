'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projects', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    
    await queryInterface.addColumn('projects', 'image', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'description');
    await queryInterface.removeColumn('projects', 'image');
  },
};

