const ControllerHome = require('../Controllers/ControllerHome')
const ControllerMahasiswa = require('../Controllers/ControllerMahasiswa')
const mataPelajaranRoute = require('./mataPelajaran')
const mahasiswaRouter = require('./mahasiswa')
const qr = require('qr-image')
//const { dashboard } = require('../Controllers/ControllerHome')

const route = require('express').Router()


route.get('/', ControllerHome.findHome)
route.get('/register', ControllerMahasiswa.register)
route.post('/register', ControllerMahasiswa.registerPost)
route.use('/MataPelajaran', mataPelajaranRoute)
route.use('/Mahasiswa', mahasiswaRouter)
route.get('/login', ControllerHome.login)
route.post('/login', ControllerHome.loginPost)
route.get('/dashboardMahasiswa/:id', (req, res, next) => {
    if (req.session.isLogin) {
        next();
    }
    else {
        let pesan = `Harus Log in untuk melihat Dashboard Mahasiswa`;
        res.redirect(`/login?pesan=${pesan}`)
    }
}, ControllerHome.dashboard)
route.get('/logout', ControllerHome.logOut)
route.get('/qr/:text/:id', function (req, res) {
    let params = req.params.text;
    let id = req.params.id;
    let gabunganStr = `/${params}/${id}`;
    let code = qr.image(gabunganStr, { type: 'png', size: 10 });
    res.setHeader('Content-type', 'image/png');
    code.pipe(res);
})
route.get('/portofolio/:id',ControllerHome.portofolio)


module.exports = route