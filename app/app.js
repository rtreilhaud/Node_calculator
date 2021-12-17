const http = require('http');
const { server } = require('./server');

const host = 'localhost';
const port = 8080;

const app = http.createServer(server);

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`);
});
