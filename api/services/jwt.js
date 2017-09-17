'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_curso';

exports.createToken = function(user){
	var payload = {
		sub: user.id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		role: user.role,
		image: user.image,
		//Fecha de creación del token
		iat: moment().unix(),
		//Fecha de expiración del token
		exp: moment().add(30, 'days').unix()
	};

	return jwt.encode(payload, secret);
};