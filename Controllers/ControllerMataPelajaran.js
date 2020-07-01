const { Jurusan, MataPelajaran, Mahasiswa, MahasiswaMataPelajaran } = require('../models')

class ControllerMataPelajaran {
    static listMataPelajaran(req, res) {
        MataPelajaran.findAll({ order: [['credit', 'asc']], include: { model: Jurusan } })
            .then(data => {
                let pesan = req.query.pesan;
                let isLogin = req.app.locals.isLogin;
                let dataMahasiswa = req.app.locals.dataMahasiswa;

                res.render('MataPelajaranPage', { mataPelajaran: data, pesan, isLogin, dataMahasiswa })

            })
            .catch(err => {
                res.send(err);
            })
    }
    static mataPelajaranAdd(req, res) {
        Jurusan.findAll()
            .then(data => {
                let pesan = req.query.pesan;
                res.render('mataPelajaranAdd', { pesan, jurusan: data })
            })
            .catch(err => {
                res.send(err);
            })
    }
    static mataPelajaranAddPost(req, res) {
        let params = req.body;
        let newName = params.name;
        let newMataId = params.jurusan;
        let newCredit = params.credit;
        MataPelajaran.create({
            name: newName,
            mataId: newMataId,
            credit: newCredit
        })
            .then(data => {
                res.redirect('/MataPelajaran')
            })
            .catch(err => {
                res.send(err);
            })
    }
    static mataPelajaranSKS(req, res) {
        let params = req.params.id;
        Mahasiswa.findAll({ where: { id: params }, include: { model: Jurusan, include: { model: MataPelajaran } } })
            .then(data => {
                let pesan = req.query.pesan;
                //res.send(data[0].Jurusan.MataPelajarans[0]);
                res.render('addSKS', { data, pesan });
            })

            .catch(err => {
                res.send(err);
            })
    }
    static mataPelajaranSKSPost(req, res) {
        let params = req.body;
        let newMahasiswaId = params.mahasiswaId;
        let newMataPelajaranId = params.SKS;

        MahasiswaMataPelajaran.findAll({ where: { mahasiswaId: newMahasiswaId, mataPelajaranId: newMataPelajaranId } })
            .then(data => {
                if (data.length === 0) {
                    MahasiswaMataPelajaran.create({
                        mahasiswaId: newMahasiswaId,
                        mataPelajaranId: newMataPelajaranId,
                    })
                        .then(data => {
                            res.redirect(`/dashboardMahasiswa/${newMahasiswaId}`)
                        })
                        .catch(err => {
                            res.send(err);
                        })
                }
                else {
                    let pesan = `Kamu sudah memilih SKS itu`;
                    res.redirect(`/MataPelajaran/addSKS/${newMahasiswaId}?pesan=${pesan}`)
                }

            })
            .catch(err => {
                res.send(err);
            })


    }
    static mataPelajaranDeleteSKS(req, res) {
        let SKSId = +req.params.id;
        let mahasiswaId = +req.params.mahasiswaID;
        MahasiswaMataPelajaran.destroy({ where: { id: SKSId } })
            .then(data => {
                res.redirect(`/dashboardMahasiswa/${mahasiswaId}`)
            })
            .catch(err => {
                res.send(err);
            })

    }
}

module.exports = ControllerMataPelajaran