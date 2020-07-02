'use strict';
const { encrypt } = require('../Helpers/bcypt')
const {
  Model, useInflection
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
      Mahasiswa.belongsTo(models.Jurusan, { foreignKey: 'jurusanId' })
      Mahasiswa.hasMany(models.MahasiswaMataPelajaran, { foreignKey: 'mahasiswaId' })
    }
    mrMs(){
      return this.name = `Mr/Ms ${this.name}`;
    }
  };
  Mahasiswa.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Nama tidak boleh kosong`
        }

      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: `Tolong Gunakan Email yang Benar`
        }

      }
    },
    sks: DataTypes.INTEGER,
    jurusanId: {
      type: DataTypes.INTEGER,
      validate: {
        notContains: {
          args: 'none',
          msg: `Jurusan tidak boleh kosong`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Password tidak boleh kosong`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Mahasiswa',
    hooks: {
      beforeCreate: (user) => {
        user.password = encrypt(user.password);
      }
    }
  });
  return Mahasiswa;
};