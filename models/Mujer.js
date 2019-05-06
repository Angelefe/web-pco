var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Mujer = new keystone.List('Mujer', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	plural: 'Boletines mujer',
});

Mujer.add({
	title: { type: String, required: true, initial: true},
	publishedDate: { type: Types.Date, index: true, required: true, initial: true },
	image: { type: Types.CloudinaryImage , required: true, initial: true},
	url: { type: Types.Url , required: true, initial: true},
});

Mujer.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

//Mujer.plural = "Boletines_Mujer";
Mujer.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Mujer.register();
