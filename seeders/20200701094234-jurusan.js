'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Jurusans', [{
      name: 'Komputer',
      createdAt:new Date(),
      updatedAt:new Date(),
    }, {
      name: 'Teknik Industri',
      createdAt:new Date(),
      updatedAt:new Date(),
    }, {
      name: 'Psikologis',
      createdAt:new Date(),
      updatedAt:new Date(),
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Jurusans', null, {});
  }
};
