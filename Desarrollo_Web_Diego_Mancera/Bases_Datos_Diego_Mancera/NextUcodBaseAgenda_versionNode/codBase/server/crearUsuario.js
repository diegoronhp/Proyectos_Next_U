/**
 * Created by diego on 14/10/2019.
 */
var User = require('./modelUsuario.js')
mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/agenda', {
    useNewUrlParser: true,
})

let Usuario = new User(
    {
        nombre: "Diego Mancera",
        usuario: "diegoron",
        password: "m4nc3r4"
    });

Usuario.save(function (error, resp) {
    if (error) console.log({ error, resp })
    else
        console.log(null, "Usuario creado")

})