'use strict'

var express = require('express');
var CerveceriaController = require('../controllers/cerveceria');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/cervecerias'});

api.post('/cervecerias', CerveceriaController.saveCerveceria);
api.post('/upload-image-cerveceria/:id', [md_upload], CerveceriaController.uploadImage);
api.delete('/cerveceria/:id', CerveceriaController.deleteCerveceria);
api.put('/cerveceria/:id', CerveceriaController.updateCerveceria);
api.get('/cervecerias', CerveceriaController.getCervecerias);
api.get('/cerveceria/:id', CerveceriaController.getCerveceria);
api.get('/get-image-cerveceria/:imageFile', CerveceriaController.getImageFile);

module.exports = api;