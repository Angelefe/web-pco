$(document).ready(async function () {
	const latitud = await getCookie('latitud');
	if (navigator.geolocation && !latitud) {
		navigator.geolocation.getCurrentPosition(guardarLocalizacionEnCookies);
	}
});

function getCookie (cname) {
	var name = cname + '=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

function setCookie (cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

async function guardarLocalizacionEnCookies (localizacion) {
	await setCookie('latitud', localizacion.coords.latitude, 1);
	await setCookie('longitud', localizacion.coords.longitude, 1);
	guardarLocalizacionDB(localizacion);
}

function guardarLocalizacionDB (localizacion) {
	var url = '/guardarLocalizacion';
	var params = {
		latitud: localizacion.coords.latitude,
		longitud: localizacion.coords.longitude,
	};
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify(params));
}
