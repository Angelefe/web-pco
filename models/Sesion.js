var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Sesion Model
 * ==========
 */

var Sesion = new keystone.List('Sesion', {
	// noedit: true,
	map: { name: 'sesionId' },
});

Sesion.add({
	sesionId: { type: String, required: true, unique: true },
	navegador: { type: String },
	acciones: {
		type: Types.Relationship,
		ref: 'Accion',
		many: true,
	},
	localizaciones: {
		type: Types.Relationship,
		ref: 'Localizacion',
		many: true,
	},
});
Sesion.register();
