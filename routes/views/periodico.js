var keystone = require('keystone');
var Post = keystone.list('Post');
var Periodico = keystone.list('Periodico');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	(async () => {
		let ultimo_periodico =	await Periodico.model.findOne()
			.sort({
				publishedDate: 'desc',
			});
		let posts = await Post.model.find()
			.where('state', 'published')
			.where('numero', ultimo_periodico.numero)
			.sort('orden');
		view.render('periodico', {
			posts: posts,
			periodico: ultimo_periodico,
		});
	})();
};
