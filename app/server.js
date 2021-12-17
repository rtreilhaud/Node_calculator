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
		const home = fs.readFileSync('./views/home.html', 'utf-8');
		let result = {};

		// Envoyer la page principale
		if (req.method === 'GET') {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(ejs.render(home, { result: result }));
			res.end();
			return;
		}

		// Traiter les données POST
		if (req.method === 'POST') {
			req.on('data', (data) => {
				result = getObjectFromData(data);
				result.result = calculate(result.nb1, result.nb2, result.operator);
				results.push(result);
			});
			req.on('end', () => {
				// Renvoie la page principale avec le résultat
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.write(ejs.render(home, { result: result }));
				res.end();
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
