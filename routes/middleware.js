/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
const keystone = require('keystone');
const _ = require('lodash');
const Sesion = keystone.list('Sesion');
const Accion = keystone.list('Accion');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Blog', key: 'blog', href: '/blog' },
	];
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};

exports.guardarSesion = async function (req, res, next) {
	if (req.method === "POST" && req.url === "/guardarLocalizacion") return next();
	try {
		const nuevaAccion = new Accion.model({
			tipo: req.url,
			time: Date.now(),
		});
		await nuevaAccion.save(err => {
			if (err) console.log("err en nacc",err)
		});
		let item = await Sesion.model.findOne()
			.where('sesionId', req.sessionID);
		if (item) {
			item.acciones = item.acciones.concat([nuevaAccion._id]);
			await item.save(err => {
				if (err) console.log("eer2", err)
			});
		}
		else {
			const nuevaSesion = new Sesion.model({
				sesionId: req.sessionID,
				navegador: req.headers['user-agent'],
				acciones: nuevaAccion._id,
			});
			await nuevaSesion.save(err => {if(err) console.log("eer3",err)} );
		}
	} catch (error) {
		null;
	}
	next();
};
