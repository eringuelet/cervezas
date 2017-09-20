'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CerveceriaSchema = Schema({
	nombre: String,
	descripcion: String,
	direccion: String,
	imagen: String
});
//Exportamos el módulo
module.exports = mongoose.model('Cerveceria', CerveceriaSchema);