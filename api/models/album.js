'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
	title: String,
	description: String,
	year: Number,
	artist: { type: Schema.ObjectId, ref: 'Artist' },
	image: String
});
//Exportamos el módulo
module.exports = mongoose.model('Album', AlbumSchema);