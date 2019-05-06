var keystone = require('keystone');
var Internacional = keystone.list('Internacional');
exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	Internacional.model.find()
    .exec(function(err, internacional) {
			view.render('internacional',{internacional: internacional});
    });
	// Render the view
};
