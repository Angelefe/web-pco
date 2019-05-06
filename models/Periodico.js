var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: 'public/uploads',
		publicPath: '/public/uploads/',
	}
});

var Periodico = new keystone.List('Periodico', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Periodico.add({
	title: { type: String , required: true, initial: true},
	publishedDate: { type: Types.Date, index: true, required: true, initial: true },
	image: { type: Types.CloudinaryImage , required: true, initial: true},
	url: { type: Types.Url , required: true, initial: true},
	numero: {
		type: Number,
	},
	archivo: { type: Types.File, storage, initial:true, },
});


Periodico.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Periodico.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Periodico.register();
