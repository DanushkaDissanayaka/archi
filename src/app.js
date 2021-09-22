
require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Simple express routes
app.get('/', function (req, res) {
   res.send('Hello World!')
});

app.get('/name', (req, res) => {
   res.status(200).send('My name is Shawn!');
});

app.get('/env', (req, res) => {
   res.status(200).json({envName:process.env.ENV_NAME, UNSET_VAR_IN_LAMBDA:process.env.UNSET_VAR_IN_LAMBDA});
});

module.exports.handler = serverless(app);

// Server
app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});