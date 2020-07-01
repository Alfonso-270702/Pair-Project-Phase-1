'use strict';
module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.createTable('MataPelajarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      jurusan: {
        type: Sequelize.STRING
      },
      credit: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down:  (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MataPelajarans');
  }
};