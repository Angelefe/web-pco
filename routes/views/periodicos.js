var keystone = require('keystone');
var Periodico = keystone.list('Periodico');
exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	Periodico.model.find()
		.sort('-publishedDate')
		.exec(function (_err, periodicos) {
			view.render('periodicos', { periodicos: periodicos });
		});
};
