var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Internacional = new keystone.List('Internacional', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Internacional.add({
	title: { type: String , required: true, initial: true},
	publishedDate: { type: Types.Date, index: true, required: true, initial: true },
	image: { type: Types.CloudinaryImage , required: true, initial: true},
	url: { type: Types.Url , required: true, initial: true},
});

Internacional.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});
Internacional.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Internacional.register();
