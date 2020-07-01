'use strict';
module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.createTable('MahasiswaMataPelajarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mahasiswaId: {
        type: Sequelize.INTEGER
      },
      mataPelajaranId: {
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
    return queryInterface.dropTable('MahasiswaMataPelajarans');
  }
};