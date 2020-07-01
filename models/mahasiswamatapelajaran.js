'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MahasiswaMataPelajaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MahasiswaMataPelajaran.belongsTo(models.Mahasiswa, {foreignKey: 'mahasiswaId'})
      MahasiswaMataPelajaran.belongsTo(models.MataPelajaran, { foreignKey: 'mataPelajaranId'})
    }
  };
  MahasiswaMataPelajaran.init({
    mahasiswaId: DataTypes.INTEGER,
    mataPelajaranId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MahasiswaMataPelajaran',
  });
  return MahasiswaMataPelajaran;
};