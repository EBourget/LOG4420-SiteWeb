var express = require('express');
var db = require('../lib/db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { titre: 'Accueil', index: true });
});

router.get('/index', function(req, res) {
	res.redirect('/');
});

router.get('/dashboard', function(req, res) {
	/*affichage des domaines*/
	var domaines = new Array();
	for(i=0; i<db.getNombreDomaines(); i++)
		domaines.push(db.getDomaineById(i))
	res.render('dashboard', { titre: 'Tableau de bord', dashboard: true, domaines: domaines });
});

router.get('/instructions', function(req, res) {
	res.render('instructions', { titre: 'Instructions', instructions: true });
});

router.post('/examen', function(req, res, next) {
	req.session.nombreQuestions = req.body.nombre_questions;
	var domaines = ['HTML', 'CSS'];
	/*for (i=0; i<db.getNombreDomaines(); i++)
	{
		monDomaine = db.getDomaineById(i);
		if(req.body.monDomaine!= undefined)
			domaines.push(req.body.monDomaine);
	}*/
	// creer un tableau avec les id des questions correspondants à sujet
	var tabQuestions = db.getQuestionsExamen(domaines);
	// sauvegarder ce tableau dans la session
	req.session.tabQuestions = JSON.stringify(tabQuestions);
	next();
});

router.get('/examen', function(req, res, next) {

	next();
});

router.all('/examen', function(req,res) {
	var tabQuestions = JSON.parse(req.session.tabQuestions);
	// choisir une question au hasard et on la supprime du tableau
	idQuestion = db.getQuestionAleatoireExamen(tabQuestions);
	// sauvegarder le nouveau tableau
	req.session.tabQuestions = JSON.stringify(tabQuestions);
	// récupérer la question
	var maQuestion = db.getQuestionById(idQuestion);
	var nomDomaine = db.getDomaineById(maQuestion.domaine);
	var enonce = maQuestion.question;
	var choix = maQuestion.choix;
	var solution = maQuestion.reponse;
	
	res.render('examen', { titre: 'Examen', nomDomaine: nomDomaine, question: enonce, reponses: choix, idReponse: solution});
});

router.post('/quicktest', function(req, res, next) {
	next();
});

router.get('/quicktest', function(req, res, next) {
	next();
});

router.all('/quicktest', function(req,res) {
	var maQuestion = db.getQuestionAleatoireTest();
	var nomDomaine = db.getDomaineById(maQuestion.domaine);
	var enonce = maQuestion.question;
	var choix = maQuestion.choix;
	var solution = maQuestion.reponse;
	res.render('quicktest', { titre: 'Test rapide', nomDomaine: nomDomaine, question: enonce, reponses: choix, idReponse: solution});
});

router.get('/results', function(req, res) {
	res.render('results', { titre: 'Résultats' });
});


module.exports = router;
