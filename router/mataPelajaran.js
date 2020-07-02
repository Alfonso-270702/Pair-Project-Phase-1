
const ControllerMataPelajaran = require('../Controllers/ControllerMataPelajaran');


const mataPelajaranRoute = require('express').Router()
mataPelajaranRoute.get('/', ControllerMataPelajaran.listMataPelajaran);
mataPelajaranRoute.get('/add', ControllerMataPelajaran.mataPelajaranAdd)
mataPelajaranRoute.post('/add', ControllerMataPelajaran.mataPelajaranAddPost)
mataPelajaranRoute.get('/addSKS/:id', ControllerMataPelajaran.mataPelajaranSKS)
mataPelajaranRoute.post('/addSKS', ControllerMataPelajaran.mataPelajaranSKSPost)
mataPelajaranRoute.get('/deleteSKS/:id/:mahasiswaId', ControllerMataPelajaran.mataPelajaranDeleteSKS)



module.exports = mataPelajaranRoute