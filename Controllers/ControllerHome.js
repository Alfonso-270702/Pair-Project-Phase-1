const { Mahasiswa, Jurusan, MataPelajaran, MahasiswaMataPelajaran } = require('../models')

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
                if (data[0].password === newPassword) {
                    req.session.isLogin = true;
                    req.session.dataMahasiswa = data[0].id;
                    let dataId = req.session.dataMahasiswa;
                    let dataMahasiswa = req.session.dataMahasiswa;
                    //res.render('dashboardMahasiswa',{dataMahasiswa})
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
        let data = req.session.dataMahasiswa;
        Mahasiswa.findAll({ where: { id: data }, include: { model: MahasiswaMataPelajaran, include: { model: MataPelajaran } } })
            .then(data => {
                let totalCredit = 0;
                for (let i = 0; i < data[0].MahasiswaMataPelajarans.length; i++) {
                    totalCredit += data[0].MahasiswaMataPelajarans[i].MataPelajaran.credit;
                }

                res.render('dashboardMahasiswa', { dataMahasiswa: data, totalCredit });
                //res.send(data[0].MahasiswaMataPelajarans[0].MataPelajaran.name);
            })
            .catch(err => {
                res.send(err);
            })
    }
    static logOut(req, res) {
        delete req.session.isLogin;
        delete req.session.dataMahasiswa;
        res.redirect('/')
    }

}
module.exports = ControllerHome