const { Mahasiswa, Jurusan, MataPelajaran, MahasiswaMataPelajaran } = require('../models')

class ControllerHome {
    
    static findHome(req, res) {
        let dataMahasiswaDanJurusan = '';
        Mahasiswa.findAll({ order:[['id','asc']],include: { model: Jurusan } })
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
                    req.app.locals.isLogin = true;
                    req.app.locals.dataMahasiswa = data[0].id;
                    let dataId = req.app.locals.dataMahasiswa;
                    let dataMahasiswa = req.app.locals.dataMahasiswa;
                    //res.render('dashboardMahasiswa',{dataMahasiswa})
                    res.redirect(`/dashboardMahasiswa/${dataId}`)
                }

            })
            .catch(err => {
                res.send(err);
            })
        
    }
    static dashboard(req,res){
        let data = req.app.locals.dataMahasiswa;
        Mahasiswa.findAll({where:{id:data},include:{model:MahasiswaMataPelajaran, include:{model:MataPelajaran}}})
        .then(data=>{
            let totalCredit = 0;
            for(let i = 0;i<data[0].MahasiswaMataPelajarans.length;i++){
                totalCredit +=data[0].MahasiswaMataPelajarans[i].MataPelajaran.credit;
            }

            res.render('dashboardMahasiswa',{dataMahasiswa:data , totalCredit});
            //res.send(data[0].MahasiswaMataPelajarans[0].MataPelajaran.name);
        })
        .catch(err=>{
            res.send(err);
        })   
    }
    static logOut(req,res){
        delete req.app.locals.isLogin;
        delete req.app.locals.dataMahasiswa;
        res.redirect('/')
    }

}
module.exports = ControllerHome