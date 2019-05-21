var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Accion Model
 * ==========
 */

var Accion = new keystone.List('Accion', {
});

Accion.add({
	tipo: { type: String },
	time: {
		type: Types.Datetime,
	},
});
Accion.register();
