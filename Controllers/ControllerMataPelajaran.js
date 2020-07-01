const { Jurusan, MataPelajaran } = require('../models')

class ControllerMataPelajaran {
    static listMataPelajaran(req, res) {
        MataPelajaran.findAll({order:[['credit','asc']],include:{model:Jurusan}})
        .then(data=>{
            let pesan = req.query.pesan;
            
            res.render('MataPelajaranPage',{mataPelajaran:data,pesan})

        })
        .catch(err=>{
            res.send(err);
        })
    }
    static mataPelajaranAdd(req, res) {
        Jurusan.findAll()
            .then(data => {
                let pesan = req.query.pesan;
                res.render('mataPelajaranAdd',{ pesan, jurusan:data})
            })
            .catch(err => {
                res.send(err);
            })
    }
    static mataPelajaranAddPost(req,res){
        let params = req.body;
        let newName = params.name;
        let newMataId= params.jurusan;
        let newCredit = params.credit;
        MataPelajaran.create({
            name:newName,
            mataId:newMataId,
            credit:newCredit
        })
        .then(data=>{
            res.redirect('/MataPelajaran')
        })
        .catch(err=>{
            res.send(err);
        })
    }
}

module.exports = ControllerMataPelajaran