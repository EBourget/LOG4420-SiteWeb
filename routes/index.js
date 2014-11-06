var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/index', function(req, res) {
  res.redirect('/');
});

router.get('/dashboard', function(req, res) {
  res.render('dashboard', { titre: 'Express' });
});

router.get('/instructions', function(req, res) {
  res.render('instructions', { titre: 'Express' });
});

router.get('/examen', function(req, res) {
  res.render('examen', { titre: 'Express' });
});

router.get('/quicktest', function(req, res) {
  res.render('quicktest', { titre: 'Express' });
});

router.get('/results', function(req, res) {
  res.render('results', { titre: 'Express' });
});


module.exports = router;
