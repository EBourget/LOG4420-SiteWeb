var express = require('express');
var questions = require('../models/questions');
var db = require('../lib/db_old');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { titre: 'Accueil', index: true });
});

router.get('/index', function(req, res) {
	res.redirect('/');
});

router.get('/dashboard', function(req, res) {
	/*affichage des domaines et recherche du nombre max de question par domaine*/
	var domaines = new Array();
	var maxQuestion = new Array();
	for(i=0; i<db.getNombreDomaines(); i++)
	{
		domaines.push(db.getDomaineById(i));
		maxQuestion.push(db.getMaxQuestion(i));
	}
	res.render('dashboard', { titre: 'Tableau de bord', dashboard: true, domaines: domaines,maxQuestion: maxQuestion});
});

router.get('/instructions', function(req, res) {
	res.render('instructions', { titre: 'Instructions', instructions: true });
});

router.post('/examen', function(req, res, next) {
	// on récupère les informations du formulaire
	req.session.nombreQuestions = req.body.nombre_questions;
	var domaines = req.body.domaines;
	if(typeof domaines == "string") // s'il n'y a qu'un domaine on le mets dans un tableau
	domaines =[domaines];
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
	maQuestion = db.getQuestionAleatoireExamen(tabQuestions);
	// sauvegarder le nouveau tableau
	req.session.tabQuestions = JSON.stringify(tabQuestions);
	// récupérer les attributs de la question
	var nomDomaine = db.getDomaine(maQuestion);
	var enonce = db.getQuestion(maQuestion);
	var choix = db.getChoix(maQuestion);
	var solution = db.getReponse(maQuestion);
	
	res.render('questions', { examen: true, titre: 'Examen', nomDomaine: nomDomaine, question: enonce, reponses: choix, idReponse: solution});
});

router.post('/quicktest', function(req, res, next) {
	next();
});

router.get('/quicktest', function(req, res, next) {
	next();
});

router.all('/quicktest', function(req,res) {
	var maQuestion = db.getQuestionAleatoireTest();
	var nomDomaine = db.getDomaine(maQuestion);
	var enonce = db.getQuestion(maQuestion);
	var choix = db.getChoix(maQuestion);
	var solution = db.getReponse(maQuestion);
	res.render('questions', { examen: false, titre: 'Test rapide', nomDomaine: nomDomaine, question: enonce, reponses: choix, idReponse: solution});
});

router.get('/results', function(req, res) {
	res.render('results', { titre: 'Résultats' });
});

router.get('/ajouterQuestion', function(req,res){
	res.render('ajouterQuestion', {titre: 'Ajouter une question', message: ''});
});

router.post('/ajouterQuestion', function(req,res){
	var enonce = req.body.enonce;
	var domaine = req.body.domaine;
	var choix = req.body.choix;
	var reponse = parseInt(req.body.reponse);
	questions.insert(enonce, domaine, choix, reponse, function(){
		res.render('ajouterQuestion', {titre: 'Ajouter une question', message: 'Ajout traité'});
	});
});


module.exports = router;
