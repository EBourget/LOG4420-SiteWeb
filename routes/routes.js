var express = require('express');
var questions = require('../models/questions');
var router = express.Router();
var statistiques = require('../models/statistiques')

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { titre: 'Accueil', index: true });
});

router.get('/index', function(req, res) {
	res.redirect('/');
});

router.get('/dashboard', function(req, res) {
	/*affichage des domaines et recherche du nombre max de question par domaine*/
	var maxQuestion = new Array;
	questions.getQuestionsDomaine("HTML", function(question1)
	{
		maxQuestion.push(question1.length);
		questions.getQuestionsDomaine("CSS", function(question2)
		{
			maxQuestion.push(question2.length);
			questions.getQuestionsDomaine("JavaScript", function(question3)
			{
				maxQuestion.push(question3.length);
				res.render('dashboard', { titre: 'Tableau de bord', dashboard: true, alertes:true, maxQuestion: maxQuestion});
			});
		});
	});
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
	var tabQuestions = new Array;

	questions.getQuestionsExamen(domaines, function(listeQuestions)
	{
		for (i = 0; i< listeQuestions.length; i++)
			tabQuestions.push(listeQuestions[i]._id);
		// sauvegarder ce tableau dans la session
		req.session.tabQuestions = JSON.stringify(tabQuestions);
		next();
	});
});

router.get('/examen', function(req, res, next) {
	next();
});

router.all('/examen', function(req,res) {
	var tabQuestions = JSON.parse(req.session.tabQuestions);
	// choisir une question au hasard et on la supprime du tableau
	var idQuestion = questions.getQuestionAleatoireExamen(tabQuestions);
	// sauvegarder le nouveau tableau
	req.session.tabQuestions = JSON.stringify(tabQuestions);
	// récupérer la question
	var question = questions.getQuestionById(idQuestion, function(question){
		res.render('questions', { examen: true, titre: 'Examen', nomDomaine: question.domaine, question: question.enonce, reponses: question.reponses, idReponse: question.bonneReponse});
	}
	);
});

router.post('/quicktest', function(req, res, next) {
	next();
});

router.get('/quicktest', function(req, res, next) {
	next();
});

router.all('/quicktest', function(req,res) {
	questions.getQuestionAleatoireTest(function(question){
		res.render('questions', { examen: false, titre: 'Test rapide', nomDomaine: question.domaine, question: question.enonce, reponses: question.reponses, idReponse: question.bonneReponse});
	});
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

router.get('/ajouterToutesLesQuestions', function(req,res){
	function Question(domaine, question, choix, reponse) {
		this.domaine = domaine;
		this.question = question;
		this.choix = choix;
		this.reponse = reponse;
	}
	quest0= new Question("HTML","What is the previous version of HTML, prior to HTML5?", ["HTML 4.01", "HTML 4", "HTML 4.1", "HTML 4.9"], 2);
	quest1= new Question("HTML","What does HTML stand for?", ["Hyper Text Markup Language","Hyperlinks and Text Markup Language","Home Tool Markup Language"], 0);
	quest2= new Question("HTML","Which HTML5 element is used to specify a footer for a document or section",["<footer>","<bottom>","<section>"],0);
	quest3= new Question("HTML","In HTML5, onblur and onfocus are:",["HTML elements","Event attributes","Style attributes"],1);
	quest4= new Question("CSS","What does CSS stand for?",["Creative Style Sheets","Computer Style Sheets","Cascading Style Sheets","Colorful Style Sheets"],2);
	quest5= new Question("CSS","Where in an HTML document is the correct place to refer to an external style sheet?", ["In the <head> section","At the top of the document","At the end of the document","In the <body> section"],0);
	quest6= new Question("CSS","Which HTML tag is used to define an internal style sheet?",["<script>","<css>","<style>"],2);
	quest7= new Question("JavaScript","Inside which HTML element do we put the JavaScript?",["<scripting>","<js>","<javascript>","<script>"],3);
	quest8= new Question("JavaScript","Where is the correct place to insert a JavaScript?",["The <body> section","<head> or <body> are correct","The <head> section"],1);
	quest9= new Question("JavaScript","How does a WHILE loop start?",["while (i <= 10)","while i = 1 to 10","while (i <= 10; i++)"],0);

	var listeQuestions = [quest0, quest1, quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9];

	for (var i = 0; i < listeQuestions.length ; i++) {
		questions.insert(listeQuestions[i].question, listeQuestions[i].domaine, listeQuestions[i].choix, listeQuestions[i].reponse);
	};
	res.render('index', {alertes : true});
});

router.route('/statistiques/Examens')
	.get(function(req,res){
		console.log("Appel au service de récupération d'examen");
		statistiques.getAllExamens(function(examens){
			res.json(examens);
		});
	});

router.route('/statistiques/StatsExamens')
	.get(function(req,res){
		console.log("Appel au service de récupération des stats d'examens");
		statistiques.recupererStatsExamens(function(nbExamens, noteTotale){
			res.json({nbExamens: nbExamens, noteTotale: noteTotale});
		});
	});

router.route('/statistiques/LastExamen')
	.get(function(req,res){
		console.log("Appel au service de récupération du dernier examen");
		statistiques.getLastExamen(function(examen){
			res.json(examen);
		});
	});

router.route('/statistiques/Examens/:domaine/:nbQuestions')
	.put(function(req,res){
		console.log("Appel au service d'insertion d'examen");
		statistiques.insert(req.params.domaine, req.params.nbQuestions, function(){
			res.json({message: "Ajout d'un examen"});
		})
	});

router.route('/statistiques/Examens/:domaine/:nbQuestions/:note')
	.post(function(req,res){
		console.log("Appel au service d'insertion de note");
		statistiques.ajouterNote(req.params.domaine, req.params.note, req.params.nbQuestions, function(exam){
			res.json({message: "Ajout d'une note"});
		})
	});

// Une fois que tu pourras passer la date (ou l'id si tu veux) via la session, supprime la route précédente et remplace-la par ce que j'ai commenté.
// router.route('/statistiques/Examens/:date/:note')
// 	.post(function(req,res){
// 		console.log("Appel au service d'insertion de note");
// 		statistiques.ajouterNote(req.params.date, req.params.note, function(exam){
// 			res.json({message: "Ajout d'une note"});
// 		})
// 	});

module.exports = router;
