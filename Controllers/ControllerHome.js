const { Mahasiswa, Jurusan} = require('../models')

class ControllerHome {
    static findHome(req,res){
        let dataMahasiswaDanJurusan='';
        Mahasiswa.findAll({include:{model:Jurusan}})
        .then(data=>{
            dataMahasiswaDanJurusan = data;
            res.render('homepage',{dataMahasiswa:dataMahasiswaDanJurusan})
        })
        .catch(err=>{
            res.send(err);
        })
        //res.render('homepage');
    }

}
module.exports = ControllerHome