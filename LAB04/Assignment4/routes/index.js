var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Famous Historical Explorers' });
});

/* GET Marco Polo page */
router.get('/marco-polo', function(req, res, next) {
  console.log('Accessing the Marco Polo page');
  res.render('marco-polo', { title: 'Marco Polo', info: 'Information about Marco Polo and his explorations...' });
});

/* GET Christopher Columbus page */
router.get('/christopher-columbus', function(req, res, next) {
  console.log('Accessing the Christopher Columbus page');
  res.render('christopher-columbus', { title: 'Christopher Columbus', info: 'Information about Christopher Columbus and his voyages...' });
});

/* GET Amelia Earhart page */
router.get('/amelia-earhart', function(req, res, next) {
  console.log('Accessing the Amelia Earhart page');
  res.render('amelia-earhart', { title: 'Amelia Earhart', info: 'Information about Amelia Earhart and her aviation achievements...' });
});

/* GET Neil Armstrong page */
router.get('/neil-armstrong', function(req, res, next) {
  console.log('Accessing the Neil Armstrong page');
  res.render('neil-armstrong', { title: 'Neil Armstrong', info: 'Information about Neil Armstrong and his moon landing...' });
});

module.exports = router;
