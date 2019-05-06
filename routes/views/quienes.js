var keystone = require('keystone');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	view.render('quienes');


};
