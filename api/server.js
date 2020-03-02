const express = require('express');
const http = require('http');
const initRoutes = require('./routes').initRoutes;
const bodyParser = require('body-parser');
require('dotenv').config();

// Create the express server
const app = express();
app.set('port', process.env.HTTP_PORT);

// Configure the instance of the http server
const server = http.Server(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
    next();
});
app.use(bodyParser.json());

server.listen(process.env.HTTP_PORT);

// Set up routes
initRoutes(app);

server.on('listening', () => {
    console.info(`✓ App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
});

server.on('error', (err) => {
    console.error('Error in the server: ' + err.message);
    process.exit(err.statusCode);
});