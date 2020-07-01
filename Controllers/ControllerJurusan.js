const { Jurusan }=require('../models')

class ControllerJurusan{
    static allJurusan(){
        Jurusan.findAll()
        .then(data=>{
            return data;
        })
        .catch(err=>{
            return err;
        })

    }
}
module.exports=ControllerJurusan