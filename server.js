//Rest API
const express = require('express');
const bodyParser = require('body-parser');
const { Mascota } = require('./mascotas');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const PORT = 4000;

app.get('/',(request,response)=>{
    response.send({message:'Server on'})
});

app.post('/create/mascota',(request,response) =>{
    const {
        tipoMascota,
        nomMascota,
        dueñoMascota,
        tamañoMascota
    } = request.body;

    const newMascota = Mascota({
        tipoMascota,
        nomMascota,
        dueñoMascota,
        tamañoMascota
    })
    
    newMascota.save((err, mascota) =>{
        if(!err){
            response.status(201).send({message:'Se ha entrado una mascota', mascota:mascota})
        }else{
            response.status(409).send({message:'Error al entrar mascota', error:err})
        }
    });
});

app.get('/mascota/:id', (req,res) => {
    const {id} = req.params;
    Mascota.findById(id)
    .populate('vuelos')
    .exec()
    .then(avion => res.status(200).send(avion))
    .catch(error => res.status(409).send(error))
})

app.get('/all/aviones',(req,res)=>{
    Mascota.find()
    .populate('vuelos')
    .exec()
    .then(aviones => res.status(200).send(aviones))
    .catch(error => res.status(409).send(error))
});

app.listen(PORT,() => {
    console.log(`Server has been initialized on port:${PORT}`)
});


