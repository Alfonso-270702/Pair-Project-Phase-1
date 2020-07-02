const ControllerMahasiswa = require('../Controllers/ControllerMahasiswa');

const mahasiswaRouter = require('express').Router();


mahasiswaRouter.get('/edit/:id',ControllerMahasiswa.namaEdit)
mahasiswaRouter.post('/edit',ControllerMahasiswa.namaEditPost)

module.exports=mahasiswaRouter;