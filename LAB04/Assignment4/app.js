// Import necessary modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors'); // Corrected import for http-errors

// Import routes
var indexRouter = require('./routes/index');

// Initialize the Express application
var app = express();

// Set up middleware
app.use(logger('dev')); // Enhanced logging for development mode
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded bodies
app.use(cookieParser()); // Parses cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files (CSS, JavaScript, images, etc.)

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use routes
app.use('/', indexRouter);

// Middleware to log unmatched requests
app.use((req, res, next) => {
  console.log(`Unmatched request at: ${req.method} ${req.path}`); // Log method and path
  next(createError(404)); // Pass a 404 error to the next error handler
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error', { error: req.app.get('env') === 'development' ? err : 'A server error occurred' }); // More informative for production
});

// Export the Express application
module.exports = app;
