'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mahasiswa.belongsTo(models.Jurusan, {foreignKey: 'jurusanId'})
      Mahasiswa.hasMany(models.MahasiswaMataPelajaran, { foreignKey: 'mahasiswaId'})
    }
  };
  Mahasiswa.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    sks: DataTypes.INTEGER,
    jurusanId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mahasiswa',
  });
  return Mahasiswa;
};