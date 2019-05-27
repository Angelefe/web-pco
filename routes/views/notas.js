var keystone = require('keystone');
var async = require('async');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: [],
	};

	// Load all categories
	view.on('init', function (next) {

		keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function (category, next) {

				keystone.list('Post').model.count().where('categories').in([category.id]).exec(function (err, count) {
					category.postCount = count;
					next(err);
				});

			}, function (err) {
				next(err);
			});
		});
	});

	// Load the current category filter
	view.on('init', function (next) {
		console.log(locals.data.categories);
		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({
				key: locals.filters.category,
			}).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	// Load the posts
	view.on('init', function (next) {
		var q;
		if (locals.data.category) {
			q = keystone.list('Post').model
				.find()
				.where('state', 'published')
				.where('categories').in([locals.data.category])
				.skip(10 * (req.query.page || 0))
				.limit(11)
				.sort('-publishedDate')
				.populate('author categories');
		}
		else {
			q = keystone.list('Post').model
				.find()
				.where('state', 'published')
				.skip(10 * (req.query.page || 0))
				.limit(11)
				.sort('-publishedDate')
				.populate('author categories');
		}
		q.exec(function (err, results) {
			console.log("vfavdsfv------> ",results.length)
			locals.data.posts.results = results.slice(0,10);
			locals.data.posts.next = results.length === 11 ? ++req.query.page || 1 : false;
			console.log(locals.data.posts);
			next(err);
		});
	});

	// Render the view
	view.render('notas');
};

/*
var keystone = require('keystone');
var Post = keystone.list('Post');
exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		categories: [],
		posts: [],
	};
	view.on('init', function (next) {

		if (req.params.category) {
			keystone.list('PostCategory').model.findOne({
				key: locals.filters.category,
			}).exec(function (err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});
	view.on('init', function (next) {

		var q = keystone.list('Post').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
			},
		})
			.sort('-publishedDate');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
		}

		q.exec(function (err, results) {
			locals.data.posts =  results;
			next(err);
		});
	});
	view.render('notas');
};
*/
