'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CervezaSchema = Schema({
	nombre: String,
	graducionAlcoholica: Number,
	precioRegular: Number,
	precioHappyHour: Number,
	descripcion: String,
    cerveceria: { type: Schema.ObjectId, ref: 'Cerveceria' },
	imagen: String
});

module.exports = mongoose.model('Cerveza', CervezaSchema);