
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

// // Server
// app.listen(port, () => {
//    console.log(`Listening on: http://localhost:${port}`);
// });

// cron job function
module.exports.hello = (event, context, callback)=>{
   console.log("hello-im-from-cron-job");
   callback(null);
}

module.exports.handler = serverless(app);