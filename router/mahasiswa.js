const ControllerMahasiswa = require('../Controllers/ControllerMahasiswa');

const mahasiswaRouter = require('express').Router();

mahasiswaRouter.get('/pilihMataPelajaran',ControllerMahasiswa.pilihMataPelajaran)


module.exports=mahasiswaRouter;