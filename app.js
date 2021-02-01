// Call in installed dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const router = require('./src/routes/router');
const webRouter = require("./src/routes/web.router")
const path = require("path");

// set up express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'))
// set up port number
global.rootpath = __dirname + "/src";
const port = 5035;
// set up home route

// set up mongoose
mongoose.connect("mongodb://localhost:27017/ha_hoc_web", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log('Error connecting to database');
  });

// set up route
app.use('/api/', router);
app.use("", webRouter);
app.use(express.static('src/public'))


//routing
// app.get('/', (request, respond) => {
//   respond.status(200).json({
//     message: 'Welcome to Project Support',
//   });
// });
// listener lắng nghe mọi request gửi về (~ server)
app.listen(port, (request, respond) => {
  console.log(`Our server is live on ${port}. Yay!`);
});