const fs = require('fs');
const ejs = require('ejs');
const { getObjectFromData, calculate } = require('./utils');

const results = [];

exports.server = (req, res) => {
	const url = req.url.replace('/', '');

	// Ignorer les favicon
	if (url === 'favicon.ico') {
		const favicon = fs.readFileSync('./assets/calculator.png');
		res.writeHead(200, { 'Content-Type': 'image/x-icon' });
		res.write(favicon);
		res.end();
		return;
	}

	// Envoyer le fichier bootstrap
	if (url === 'bootstrap') {
		res.writeHead(200, { 'Content-Type': 'text/css' });
		const bootstrap = fs.readFileSync('./assets/css/bootstrap.min.css');
		res.write(bootstrap);
		res.end();
		return;
	}

	// Page principale
	if (url === '') {
		// Envoyer la page principale
		if (req.method === 'GET') {
			const home = fs.readFileSync('./views/home.html', 'utf-8');
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(home);
			res.end();
			return;
		}

		// Traiter les données POST
		if (req.method === 'POST') {
			req.on('data', (data) => {
				const d = getObjectFromData(data);
				d.result = calculate(d.nb1, d.nb2, d.operator);
				console.log(d);
				results.push(d);
				console.log(results);
			});
			return;
		}
	}

	// Page Memory
	if (url === 'memory') {
		// Envoyer la page principale
		if (req.method === 'GET') {
			const memory = fs.readFileSync('./views/memory.html', 'utf-8');
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(ejs.render(memory, { results: results }));
			res.end();
			return;
		}
	}
};
