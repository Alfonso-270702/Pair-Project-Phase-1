const ControllerJurusan = require("./ControllerJurusan")
const { Jurusan, Mahasiswa } = require('../models')


class ControllerMahasiswa {
    static register(req, res) {
        Jurusan.findAll()
            .then(data => {
                //res.send(data);
                let pesan = req.query.pesan;
                res.render('register', { jurusan: data, pesan })
            })
            .catch(err => {

                res.send(err);


            })

    }
    static registerPost(req, res) {
        let params = req.body;
        let newName = params.name;
        let newEmail = params.email;
        let newPassword = params.password;
        let newConfirmPassword = params.confirmPassword;
        let newJurusan = params.jurusan;
        if (newPassword === newConfirmPassword) {
            Mahasiswa.create({
                name: newName,
                email: newEmail,
                password: newPassword,
                jurusanId: newJurusan,
                sks: null,
            })
                .then(data => {
                    res.redirect('/')
                })
                .catch(err => {
                    if (err.name === 'SequelizeValidationError') {
                        
                        let errStr='';
                        for(let i = 0;i<err.errors.length;i++){
                            if(i === err.errors.length-1){
                                errStr+=err.errors[i].message
                            }
                            else{
                                errStr+=err.errors[i].message
                                errStr+=`, `
                            }
                        }
                        res.redirect(`/register?pesan=${errStr}`)
                    }
                    else {
                        res.send(err);
                    }

                })

        }
        else {

            let pesan = `Password dan Confirm Password tidak sama`
            res.redirect(`/register?pesan=${pesan}`)


        }

        //console.log(params)
    }
    static pilihMataPelajaran(req, res) {

    }

}

module.exports = ControllerMahasiswa