const mongoose = require('mongoose');
const URL_MONGO = "mongodb+srv://cyn2903:1234567.@cluster0-iqsf0.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(URL_MONGO,{ useNewUrlParser:true },(err) => {
    if(!err){ 
        console.log('Conexión exitosa en MongoDB')
    }else{
        console.log(err)
    };
    
});

const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
    tipoMascota:String,
    nomMascota:String,
    dueñoMascota:String,
    tamañoMascota:[
        {
        type:String,
        tam:['S','N','J']
        }
    ]
},{timestamps:true});

const Mascota = mongoose.model( 'Mascota', mascotaSchema );

module.exports = {
    Mascota
}

