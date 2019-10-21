/**
 * Created by diego on 14/10/2019.
 */
const Router = require('express').Router();
const Usuario = require('./modelUsuario.js');
const Evento = require('./modelEvento.js');

let sesionUsuario = '';

//Login de usuario
Router.post('/login', function(req,res){
    let usuario = req.body.user
    sesionUsuario = usuario
    let password = req.body.pass
    Usuario.findOne({usuario: usuario},{password: password}).exec(function(err, doc){
        if(err){
            console.log(err)
        }
        else{
            if(doc != null){
                res.json("Validado")
            }else{
                res.json("Registro no existente")
            }

        }
    })
})


//Obtener todos los eventos del usuario
Router.get('/all', function(req, res) {
    Evento.find({propietario: sesionUsuario}).exec(function(err, doc){
        if(err){
            console.log(err)
        }else{
            if(doc != null){
                res.json(doc);
            }else{
                res.json({});
            }
        }
    })
})



// Agregar a un evento a un usuario
Router.post('/new', function(req, res) {
    let evento = new Evento({
        nombre: req.body.title,
        propietario: sesionUsuario,
        fechaInicial: req.body.start,
        fechaFinal: req.body.end,
        horaInicial: req.body.start_hour,
        horaFinal: req.body.end_hour,
        diaCompleto: req.body.allDay
    })
    evento.save(function(err, doc){
        if(err){
            console.log(err)
        }
        else{
            res.json("Evento creado")
        }
    })
})

// Eliminar el evento de un usuario
Router.post('/delete/:id', function(req, res) {
    let idEvento = req.params.id;
    Evento.remove({_id: idEvento}, function(err){
        if(err){
            console.log(err)
        }
        else{
            res.send("Evento eliminado")
        }
    })
})

// Actualizar el evento de un usuario
Router.post('/update/:id', function(req, res) {
    let idEvento = req.params.id;
    let inicio = req.body.start;
    let fin = req.body.end;
    let diaCompleto = req.body.allDay;
    Evento.updateOne({_id: idEvento}, {fechaInicial: inicio, fechaFinal: fin, diaCompleto: diaCompleto}, function(err){
        if(err){
            console.log(err)
        }else{
            res.send("Evento actualizado")
        }
    })
})



module.exports = Router
