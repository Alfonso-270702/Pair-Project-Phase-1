const { Mahasiswa, Jurusan, MataPelajaran, MahasiswaMataPelajaran } = require('../models')
const { compare } = require('../Helpers/bcypt')

class ControllerHome {

    static findHome(req, res) {
        let dataMahasiswaDanJurusan = '';
        Mahasiswa.findAll({ order: [['id', 'asc']], include: { model: Jurusan } })
            .then(data => {
                dataMahasiswaDanJurusan = data;
                res.render('homepage', { dataMahasiswa: dataMahasiswaDanJurusan })
            })
            .catch(err => {
                res.send(err);
            })
        //res.render('homepage');
    }
    static login(req, res) {
        let pesan = req.query.pesan;


        res.render('loginPage', { pesan });
    }
    static loginPost(req, res) {
        let params = req.body;
        let newEmail = params.email;
        let newPassword = params.password;
        Mahasiswa.findAll({ where: { email: newEmail } })
            .then(data => {
                if (compare(newPassword, data[0].password)) {
                    req.session.isLogin = true;
                    req.session.dataMahasiswa = data[0].id;
                    req.session.jurusan = data[0].jurusanId;
                    let dataId = req.session.dataMahasiswa;
                    res.redirect(`/dashboardMahasiswa/${dataId}`)
                }
                else {
                    let pesan = `Password Salah`;
                    res.redirect(`/login?pesan=${pesan}`)
                }


            })
            .catch(err => {
                let pesan = `Email tidak terdaftar`;
                res.redirect(`/login?pesan=${pesan}`)
            })

    }
    static dashboard(req, res) {
        let dataID = req.session.dataMahasiswa;
        let dataMahasiswa = '';
        let jurusan='';
        Mahasiswa.findAll({ where: { id: dataID }, include: { model: MahasiswaMataPelajaran, include: { model: MataPelajaran } } })
            .then(data => {
                dataMahasiswa = data;
                return Mahasiswa.findAll({ where: { id: dataID }, include: { model: Jurusan } })
            })
            .then(data => {
                jurusan = data;
                return MahasiswaMataPelajaran.findAll({ where: { mahasiswaId: dataID }, include: { model: MataPelajaran } })


            })
            .then(data=>{
                let totalCredit = 0;
                for (let i = 0; i < data.length; i++) {
                    totalCredit += data[i].MataPelajaran.credit;
                }

                res.render('dashboardMahasiswa', { dataMahasiswa, totalCredit, jurusan});


            })
            .catch(err => {
                res.send(err)
            })
       
    }
    static logOut(req, res) {
        delete req.session.isLogin;
        delete req.session.dataMahasiswa;
        delete req.session.jurusanId;
        res.redirect('/')
    }
    static portofolio(req, res) {
        let dataID = req.params.id;
        let dataMahasiswa = '';
        let jurusan = '';
        Mahasiswa.findAll({ where: { id: dataID }, include: { model: MahasiswaMataPelajaran, include: { model: MataPelajaran } } })
            .then(data => {
                dataMahasiswa = data;
                return Mahasiswa.findAll({ where: { id: dataID }, include: { model: Jurusan } })
            })
            .then(data => {
                jurusan = data;
                return MahasiswaMataPelajaran.findAll({ where: { mahasiswaId: dataID }, include: { model: MataPelajaran } })


                //let totalCredit = 0;
                // for (let i = 0; i < dataMahasiswa[0].MahasiswaMataPelajarans.length; i++) {
                //     totalCredit += data[0].MahasiswaMataPelajarans[i].MataPelajaran.credit;
                // }
                // res.send(dataMahasiswa[0].MahasiswaMataPelajarans[1]);
                //res.send(dataMahasiswa[0].MahasiswaMataPelajarans[0].MataPelajaran.id);
                //res.render('portofolioMahasiswa', { dataMahasiswa, totalCredit, jurusan: data });
            })
            .then(data => {
                let totalCredit = 0;
                for (let i = 0; i < data.length; i++) {
                    totalCredit += data[i].MataPelajaran.credit;
                }
                //console.log(data[1].MataPelajaran.credit);
                res.render('portofolioMahasiswa', { dataMahasiswa, totalCredit, jurusan });

            })
            .catch(err => {
                res.send(err);
            })
    }

}
module.exports = ControllerHome