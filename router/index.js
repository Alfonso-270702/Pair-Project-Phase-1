const ControllerHome = require('../Controllers/ControllerHome')
const ControllerMahasiswa = require('../Controllers/ControllerMahasiswa')
const mataPelajaranRoute = require('./mataPelajaran')
const mahasiswaRouter = require('./mahasiswa')

const route = require('express').Router()


route.get('/',ControllerHome.findHome)
route.get('/register',ControllerMahasiswa.register)
route.post('/register',ControllerMahasiswa.registerPost)
route.use('/MataPelajaran',mataPelajaranRoute)
route.use('/Mahasiswa',mahasiswaRouter)
route.get('/login',ControllerHome.login)
route.post('/login',ControllerHome.loginPost)
route.get('/dashboardMahasiswa/:id',ControllerHome.dashboard)
route.get('/logout',ControllerHome.logOut)

module.exports = route