var keystone = require('keystone');
var Mujer = keystone.list('Mujer');
exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	Mujer.model.find()
    .sort('-publishedAt')
    .exec(function(err, mujer) {
			view.render('mujer',{mujer: mujer});
    });
};
