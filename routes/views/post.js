var keystone = require('keystone');
var Post = keystone.list('Post');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
	};

	(async () => {
		let post = await Post.model.findOne({
			state: 'published',
			slug: locals.filters.post,
		})
			.exec();
		let otros = await Post.model.find()
			.where('state', 'published')
			.sort('-publishedAt')
			.limit(6)
			.exec();
		view.render('post', {
			post: post,
			otros: otros,
		});
	})();

};
