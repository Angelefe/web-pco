const keystone = require('keystone');
const Post = keystone.list('Post');
const Periodico = keystone.list('Periodico');
const Internacional = keystone.list('Internacional');
const Mujer = keystone.list('Mujer');


exports = module.exports = function (req, res) {
	const view = new keystone.View(req, res);
	(async () => {
		let posts = await Post.model.find()
			.where('state', 'published')
			.sort('-publishedDate')
			.limit(6);
		let ultimo_periodico = await Periodico.model.findOne()
			.sort({
				publishedDate: 'desc',
			});
		let ultimo_internacional = await Internacional.model.findOne()
			.sort({
				publishedDate: 'desc',
			});
		let ultimo_mujer = await Mujer.model.findOne()
			.sort({
				publishedDate: 'desc',
			});
		view.render('index', {
			posts: posts,
			ultimo_periodico: ultimo_periodico,
			ultimo_internacional: ultimo_internacional,
			ultimo_mujer: ultimo_mujer,
		});
	})();
};
