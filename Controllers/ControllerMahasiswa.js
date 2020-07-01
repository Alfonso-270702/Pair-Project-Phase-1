const ControllerJurusan = require("./ControllerJurusan")
const { Jurusan, Mahasiswa } = require('../models')


class ControllerMahasiswa {
    static register(req, res) {
        Jurusan.findAll()
        .then(data=>{
            //res.send(data);
            let pesan = req.query.pesan;
            res.render('register',{jurusan:data, pesan})
        })
        .catch(err=>{
            res.send(err);
        })

    }
    static registerPost(req,res){
        let params = req.body;
        let newName = params.name;
        let newEmail = params.email;
        let newPassword = params.password;
        let newConfirmPassword = params.confirmPassword;
        let newJurusan = params.jurusan;
        if(newPassword === newConfirmPassword){
            Mahasiswa.create({
                name:newName,
                email:newEmail,
                password:newPassword,
                jurusanId:newJurusan,
                sks:null,
            })
            .then(data=>{
                res.redirect('/')
            })
            .catch(err=>{
                res.send(err);
            })

        }
        else{
            let pesan = `Password dan Confirm Password tidak sama`
            res.redirect(`/register?pesan=${pesan}`)
        }
        
        //console.log(params)
    }

}

module.exports = ControllerMahasiswa