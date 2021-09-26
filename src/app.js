
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

// Test if the env variables has set correctly
app.get('/env', (req, res) => {
   res.status(200).json({envName:process.env.ENV_NAME, 
      DB_HOST:process.env.DB_HOST || 'db_host_default', 
      DB_USER:process.env.DB_USER || 'db_user_default',
      DB_PASSWORD:process.env.DB_PASSWORD || 'db_password_default',
      DATABASE:process.env.DATABASE || 'db_default'
   });
});

module.exports.handler = serverless(app);

// Server
app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});