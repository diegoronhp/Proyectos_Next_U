/**
 * Created by diego on 14/10/2019.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nombre : {type:String, required: true},
    usuario : {type:String, required: true},
    password : {type:String, required: true}
})

var User = mongoose.model('usuarios', userSchema)

module.exports = User;