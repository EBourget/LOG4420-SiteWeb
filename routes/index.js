var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { titre: 'Accueil', index: true });
});

router.get('/index', function(req, res) {
	res.redirect('/');
});

router.get('/dashboard', function(req, res) {
	res.render('dashboard', { titre: 'Tableau de bord', dashboard: true });
});

router.get('/instructions', function(req, res) {
	res.render('instructions', { titre: 'Instructions', instructions: true });
});

router.get('/examen', function(req, res, next) {
	next();
});

router.post('/examen', function(req, res, next) {
	req.session.nombreQuestions = req.body.nombre_questions;
	var sujets = new Array();
	next();
});

router.all('/examen', function(req,res) {
	res.render('examen', { titre: 'Examen' });
});

router.get('/quicktest', function(req, res, next) {
	next();
});

router.post('/quicktest', function(req, res, next) {
	next();
});

router.all('/quicktest', function(req,res) {
	res.render('quicktest', { titre: 'Test rapide', nomDomaine: 'HTML, CSS ou JS', question: "Question ?!", reponses: ['Réponse 1', 'Réponse 2', 'Réponse 3'], idReponse: 2 });
});

router.get('/results', function(req, res) {
	res.render('results', { titre: 'R&eacute;sultats' });
});


module.exports = router;
