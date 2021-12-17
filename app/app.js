require('dotenv').config();
const http = require('http');
const { server } = require('./server');

const { APP_HOST: host, APP_PORT: port } = process.env;

const app = http.createServer(server);

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}`);
});
