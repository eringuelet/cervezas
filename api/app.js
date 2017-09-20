'use strict'

//Inclusión de dependencias
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Importación de rutas
var user_routes = require('./routes/user');
var cerveza_routes = require('./routes/cerveza');
var cerveceria_routes = require('./routes/cerveceria');

//Se parsean los datos al formato JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configuración de las cabeceras HTTP
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
	res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');

	next();
});

//Rutas habilitadas
app.use('/api', user_routes);
app.use('/api', cerveza_routes);
app.use('/api', cerveceria_routes);

module.exports = app;