
const ControllerMataPelajaran = require('../Controllers/ControllerMataPelajaran')

const mataPelajaranRoute = require('express').Router()
mataPelajaranRoute.get('/',ControllerMataPelajaran.listMataPelajaran)
mataPelajaranRoute.get('/add',ControllerMataPelajaran.mataPelajaranAdd)
mataPelajaranRoute.post('/add',ControllerMataPelajaran.mataPelajaranAddPost)



module.exports = mataPelajaranRoute