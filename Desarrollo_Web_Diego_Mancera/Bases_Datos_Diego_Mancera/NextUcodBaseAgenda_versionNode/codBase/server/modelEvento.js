/**
 * Created by diego on 19/10/2019.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventoSchema = new Schema({
    nombre : {type:String, required: true},
    propietario: {type:String, required: true},
    fechaInicial : {type:String, required: true},
    fechaFinal : {type:String, required: true},
    horaInicial : {type:String, required: false},
    horaFinal : {type:String, required: false},
    diaCompleto : {type:Boolean, required: false}
})

var Evento = mongoose.model('eventos', eventoSchema)

module.exports = Evento;
