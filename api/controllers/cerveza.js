'use strict'

var fs = require('fs');
var path = require('path');
var Cerveza = require('../models/cerveza');

function saveCerveza(req, res){
	var params = req.body;
	var cerveza = new Cerveza();

	cerveza.nombre = params.nombre;
    cerveza.cerveceria = params.cerveceria;
	cerveza.descripcion = params.descripcion;
	cerveza.precioRegular = params.precioRegular;
	cerveza.precioHappyHour = params.precioHappyHour;
	cerveza.graduacionAlcoholica;
    cerveza.imagen = 'null';

    if (cerveza.nombre != null && cerveza.cerveceria != null){
        cerveza.save((err, cervezaStored) => {
            if (err) {
                res.status(500).send({
                    'message': 'Ocurrió un error al guardar la cerveza'
                });
            }
            else {
                res.status(200).send({
                    'cerveza' : cervezaStored
                });
            }
        });
    }
    else {
        res.status(200).send({
            'message' : 'Ingrese los campos obligatorios'
        });
    }	
}

function deleteCerveza(req, res){
	var cervezaId = req.params.id;

	Cerveza.findByIdAndRemove(cervezaId, (err, cervezaRemoved) => {
		if (err){
			res.status(500).send({message: 'Error en la petición'});
		}
		else {
			if (!cervezaRemoved){
				res.status(404).send({message: 'La cerveza no pudo eliminarse'});
			}
			else {
                res.status(200).send({
                    cerveza: cervezaRemoved
                });
			}
		}
	});
}

function updateCerveza(req, res){
	var cervezaId = req.params.id;
	var update = req.body;

	//Se controla que el id de la URL sea el mismo que el id guardado en el token
	/*if (userId != req.user.sub){
		res.status(500).send({message: 'No tienes permisos para actualizar este usuario'})
	}*/

	Cerveza.findByIdAndUpdate(cervezaId, update, (err, cervezaUpdated) => {
		if (err){
			res.status(500).send({message: 'Ocurrió un error al actualizar la cerveza'})
		}
		else {
			if (!cervezaUpdated){
				res.status(404).send({message: 'La cerveza no ha podido actualizarse'});
			}
			else {
				res.status(200).send({
                    cerveza: cervezaUpdated
                });
			}
		}
	});
}

function getCervezas(req, res){
	var cerveceriaId = req.params.cerveceria;

	if (!cerveceriaId){
		var find = Cerveza.find({}).sort('nombre');
	}
	else {
		var find = Cerveza.find({ cerveceria: cerveceriaId }).sort('nombre');
	}

	find.populate({ path: 'cerveceria' }).exec( (err, cervezas) => {
		if (err){
			res.status(500).send({message: 'Error en la petición'});
		}
		else {
			if (!cervezas){
				res.status(404).send({message: 'No hay cervezas'});
			}
			else {
				res.status(200).send({
                    cervezas: cervezas
                });
			}
		}
	});
}

function getCerveza(req, res){
	var cervezaId = req.params.id;

	Cerveza.findById(cervezaId, (err, cerveza) => {
		if (err){
			res.status(500).send({message: 'Error en la petición'});
		}
		else {
			if (!cerveza){
				res.status(404).send({message: 'No existe la cerveza'});
			}
			else {
				res.status(200).send({ 
					cerveza: cerveza
				});
			}
		}
	});
}

function uploadImage(req, res){
	var cervezaId = req.params.id;
	var file_name = 'No subido...';

	if (req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			Cerveza.findByIdAndUpdate(cervezaId, { imagen: file_name }, (err, cervezaUpdated) => {
				if (!cervezaUpdated){
					res.status(404).send({message: 'La cerveza no ha podido actualizarse'});
				}
				else {
					res.status(200).send({
                        imagen: file_name, 
                        cerveza: cervezaUpdated
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
	var path_file = './uploads/cervezas/' + imageFile;
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
	saveCerveza,
    deleteCerveza,
    updateCerveza,
    getCervezas,
    getCerveza,
    uploadImage,
    getImageFile
};