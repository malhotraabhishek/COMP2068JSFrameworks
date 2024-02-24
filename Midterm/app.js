// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Set Jade as the view engine
app.set('view engine', 'jade');

// MongoDB connection
const username = 'expressApp';
const password = 'password3210';
const clusterName = 'expressapp.luqclji.mongodb.net';
const databaseName = 'myDB';

mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}/${databaseName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const indexRouter = require('./routes/index');

// Use '/' as the prefix for indexRouter
app.use('/', indexRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error', message: err.message, error: err });
});

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
