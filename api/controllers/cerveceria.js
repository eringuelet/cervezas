'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var Cerveceria = require('../models/cerveceria');
var Cerveza = require('../models/cerveza');

function saveCerveceria(req, res){
	var cerveceria = new Cerveceria();
	var params = req.body;

	cerveceria.nombre = params.nombre;
	cerveceria.descripcion = params.descripcion;
	cerveceria.direccion = params.direccion;
	cerveceria.image = 'null';

	if (cerveceria.nombre != null){
		cerveceria.save((err, cerveceriaStored) => {
			if (err){
				res.status(500).send({message: 'Error al guardar la cervecería'});
			}
			else {
				if (!cerveceriaStored){
					res.status(404).send({message: 'La cerveceria no ha sido guardada'});
				}
				else {
					res.status(200).send({cerveceria: cerveceriaStored});
				}
			}
		});
	}
	else {
		res.status(500).send({
			'message' : 'El nombre de la cerveceria es obligatorio'
		});
	}
}

function deleteCerveceria(req, res){
	var cerveceriaId = req.params.id;

	Cerveceria.findByIdAndRemove(cerveceriaId, (err, cerveceriaRemoved) => {
		if (err){
			res.status(500).send({message: 'Error en la petición'});
		}
		else {
			if (!cerveceriaRemoved){
				res.status(404).send({message: 'La cervecería no pudo eliminarse'});
			}
			else {
				//Se eliminan las cervezas que tiene asociadas
				Cerveza.find({ cerveceria: cerveceriaRemoved._id }).remove((err, cervezaRemoved) => {
					if (err){
						res.status(500).send({message: 'Error en la petición'});
					}
					else {
						if (!cervezaRemoved){
							res.status(404).send({message: 'La cerveza no pudo eliminarse'});
						}
						else {
							res.status(200).send({
								cerveceria: cerveceriaRemoved
							});
						}
					}
				});
			}
		}
	});
}

function updateCerveceria(req, res){
	var cerveceriaId = req.params.id;
	var update = req.body;

	Cerveceria.findByIdAndUpdate(cerveceriaId, update, (err, cerveceriaUpdated) => {
		if (err){
			res.status(500).send({message: 'Error en la petición'});
		}
		else {
			if (!cerveceriaUpdated){
				res.status(404).send({message: 'La cervecería no pudo actualizarse'});
			}
			else {
				res.status(200).send({cerveceria: cerveceriaUpdated});
			}
		}
	});
}

function getCervecerias(req, res){
	if (req.params.page){
		var page = req.params.page;
	}
	else {
		var page = 1;
	}
	var itemsPerPage = 30;

	Cerveceria.find().sort('nombre').paginate(page, itemsPerPage, function(err, cervecerias, total){
		if (err){
			res.status(500).send({message: 'Error en la petición'});
		}
		else {
			if (!cervecerias){
				res.status(404).send({message: 'No hay cervecerias'});
			}
			else {
				res.status(200).send({
					totalItems: total,
					cervecerias: cervecerias
				});
			}
		}
	});
}

function getCerveceria(req, res){
	var cerveceriaId = req.params.id;

	Cerveceria.findById(cerveceriaId, (err, cerveceria) => {
		if (err){
			res.status(500).send({message: 'Error en la petición'});
		}
		else {
			if (!cerveceria){
				res.status(404).send({message: 'No existe la cervecería'});
			}
			else {
				res.status(200).send({ 
					cerveceria: cerveceria
				});
			}
		}
	});
}

function uploadImage(req, res){
	var cerveceriaId = req.params.id;
	var file_name = 'No subido...';

	if (req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			Cerveceria.findByIdAndUpdate(cerveceriaId, {imagen: file_name}, (err, cerveceriaUpdated) => {
				if (!cerveceriaUpdated){
					res.status(404).send({message: 'La cerveceria no ha podido actualizarse'});
				}
				else {
					res.status(200).send({
						imagen: file_name,
						cerveceria: cerveceriaUpdated
					});
				}
			});
		}
		else {
			res.status(200).send({message: 'Extensión del archivo no válida'});
		}
	}
	else {
		res.status(200).send({message: 'No has subido ninguna imagen'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/cervecerias/' + imageFile;
	fs.exists(path_file, function(exists){
		if (exists){
			res.sendFile(path.resolve(path_file));
		}
		else {
			res.status(200).send({message: 'La imagen no existe'});
		}
	});
}

module.exports = {
	getCerveceria,
	saveCerveceria,
	getCervecerias,
	updateCerveceria,
	deleteCerveceria,
	uploadImage,
	getImageFile
}