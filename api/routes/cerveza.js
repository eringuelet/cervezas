'use strict'

var express = require('express');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/cervezas'});
var CervezaController = require('../controllers/cerveza');

api.post('/cervezas', CervezaController.saveCerveza);
api.post('/upload-image-cerveza/:id', [md_upload], CervezaController.uploadImage);
api.delete('/cerveza/:id', CervezaController.deleteCerveza);
api.put('/cerveza/:id', CervezaController.updateCerveza);
api.get('/cervezas/:cerveceria?', CervezaController.getCervezas);
api.get('/cerveza/:id', CervezaController.getCerveza);
api.get('/get-image-cerveza/:imageFile', CervezaController.getImageFile);

module.exports = api;