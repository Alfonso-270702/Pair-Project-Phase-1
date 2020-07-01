const ControllerHome = require('../Controllers/ControllerHome')
const ControllerMahasiswa = require('../Controllers/ControllerMahasiswa')

const route = require('express').Router()


route.get('/',ControllerHome.findHome)
route.get('/register',ControllerMahasiswa.register)
route.post('/register',ControllerMahasiswa.registerPost)

module.exports = route