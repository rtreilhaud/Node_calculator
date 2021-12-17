const fs = require('fs');
const ejs = require('ejs');
const { getObjectFromData, calculate } = require('./utils');

const home = fs.readFileSync('./views/home.html', 'utf-8'); // Page d'accueil
const memory = fs.readFileSync('./views/memory.html', 'utf-8'); // Page de mémoire
let results = []; // Liste des résultats (memory)
let result = {}; // Dernier résultat (affiché dans home)

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
		// Envoyer la page de mémoire
		if (req.method === 'GET') {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(ejs.render(memory, { results: results }));
			res.end();
			return;
		}

		// Reset la page de mémoire
		if (req.method === 'POST') {
			// Reset les variables globales
			results = [];
			result = {};
			// Renvoie la page principale
			res.writeHead(302, { Location: '/' });
			res.end();
			return;
		}
	}
};
