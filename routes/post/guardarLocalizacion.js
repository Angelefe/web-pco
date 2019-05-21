var keystone = require('keystone');
var Sesion = keystone.list('Sesion');
var localizacion = keystone.list('Localizacion');


exports = module.exports = async function (req) {
	try {
		const nuevaLocalizacion = new localizacion.model({
			localizacion: [req.body.latitud, req.body.longitud],
			time: Date.now(),
		});

		let item = await Sesion.model.findOne()
			.where('sesionId', req.sessionID);
		if (item) {
			await nuevaLocalizacion.save(err => {
				if (err) console.log(err);
			});
			item.localizaciones = item.localizaciones.concat([nuevaLocalizacion._id]);
			await item.save(err => { if (err) console.log(err); });
		}
	} catch (error) {
		null;
	}
};
