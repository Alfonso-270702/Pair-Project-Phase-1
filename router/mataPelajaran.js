
const ControllerMataPelajaran = require('../Controllers/ControllerMataPelajaran');
const ControllerHome = require('../Controllers/ControllerHome');

const mataPelajaranRoute = require('express').Router()
mataPelajaranRoute.get('/', (req, res, next) => {
    if (req.session.isLogin) {
        next();
    }
    else {
        let pesan = `Harus Log in untuk melihat Mata Pelajaran`;
        res.redirect(`/login?pesan=${pesan}`)
    }
}, ControllerMataPelajaran.listMataPelajaran);
mataPelajaranRoute.get('/add', ControllerMataPelajaran.mataPelajaranAdd)
mataPelajaranRoute.post('/add', ControllerMataPelajaran.mataPelajaranAddPost)
mataPelajaranRoute.get('/addSKS/:id',ControllerMataPelajaran.mataPelajaranSKS)
mataPelajaranRoute.post('/addSKS',ControllerMataPelajaran.mataPelajaranSKSPost)
mataPelajaranRoute.get('/deleteSKS/:id/:mahasiswaId',ControllerMataPelajaran.mataPelajaranDeleteSKS)



module.exports = mataPelajaranRoute