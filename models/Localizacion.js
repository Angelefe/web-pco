var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Localizacion Model
 * ==========
 */

var Localizacion = new keystone.List('Localizacion', {
	// noedit: true,
});

Localizacion.add({
	localizacion: { type: Types.GeoPoint },
	time: { type: Types.Datetime},
});
Localizacion.register();
