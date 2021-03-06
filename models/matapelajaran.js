'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MataPelajaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MataPelajaran.hasMany(models.MahasiswaMataPelajaran, { foreignKey: 'mataPelajaranId'})
      MataPelajaran.belongsTo(models.Jurusan,{foreignKey:'mataId'})
    }
  };
  MataPelajaran.init({
    name: DataTypes.STRING,
    credit: DataTypes.INTEGER,
    mataId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MataPelajaran',
  });
  return MataPelajaran;
};