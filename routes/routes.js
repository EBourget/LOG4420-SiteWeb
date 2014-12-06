var express = require('express');
var questions = require('../models/questions');
var examens = require('../models/examens')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { titre: 'Accueil', index: true });
});

router.get('/index', function(req, res) {
	res.redirect('/');
});

router.get('/dashboard', function(req, res) {
	if(req.session.noteTests == undefined)
		req.session.noteTests = 0;
	if(req.session.nbQuestionsTests == undefined)
		req.session.nbQuestionsTests = 0;
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
	// on met en forme les domaines
	var mesDomaines= "";
	for(i=0; i<domaines.length; i++)
	{
		mesDomaines+= domaines[i];
		if (i != domaines.length - 1)
			mesDomaines += ", "; // on met à jour la chaine de caractères
	}
	req.session.domaines = mesDomaines;
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
	req.session.noteCourante = 0;
	req.session.nbQuestionsCourant = 0;
	res.render('questions', { examen: true, titre: 'Examen'});
});

router.post('/quicktest', function(req, res, next) {
	next();
});

router.get('/quicktest', function(req, res, next) {
	next();
});

router.all('/quicktest', function(req,res) {
	// initialisation des stats des tests
	req.session.noteCourante = 0;
	req.session.nbQuestionsCourant = 0;
	res.render('questions', { examen: false, titre: 'Test rapide'});
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
		questions.insert(listeQuestions[i].question, listeQuestions[i].domaine, listeQuestions[i].choix, listeQuestions[i].reponse, function(){});
	};
	res.render('index', {alertes : true});
});

router.get('/api/getQuestionAleatoireTest/', function(req,res){
	questions.getQuestionAleatoireTest(function(question){
		res.json({ 	domaine: question.domaine, 
					enonce: question.enonce, 
					reponses: question.reponses,
					id: question._id 
			})
	});
});

router.get('/api/getQuestionAleatoireExamen/', function(req,res){
	var tabQuestions = JSON.parse(req.session.tabQuestions);
	// choisir une question au hasard et on la supprime du tableau
	var idQuestion = questions.getQuestionAleatoireExamen(tabQuestions);
	// sauvegarder le nouveau tableau
	req.session.tabQuestions = JSON.stringify(tabQuestions);
	// récupérer la question
	questions.getQuestionById(idQuestion,function(question){
		res.json({ 	domaine: question.domaine, 
					enonce: question.enonce, 
					reponses: question.reponses,
					id: question._id
			});
	});
});

router.get('/api/getBonneReponse/:id', function(req,res){
	questions.getQuestionById(req.params.id, function(question){
		res.json({ reponse: question.bonneReponse });
	});
});

router.get("/api/getNote/", function(req,res){
	// si on a posé moins de questions que demandé
	if(req.session.nombreQuestions != req.session.nbQuestionsCourant)
 		var etat = false;
 	else // si toutes les questions on été posées
 		var etat = true;
	res.json({
		note: req.session.noteCourante,
		nbQuestions: req.session.nbQuestionsCourant,
		examenTermine: etat
	});
});

router.get("/api/addBonneReponseTest/", function(req,res){
	req.session.noteCourante ++;
	req.session.noteTests ++;
	res.json({});
});

router.get("/api/addQuestionTest/", function(req,res){
	req.session.nbQuestionsCourant ++;
	req.session.nbQuestionsTests ++;
	res.json({});
});

router.get("/api/addBonneReponseExamen/", function(req,res){
	req.session.noteCourante ++;
	res.json({});
});

router.get("/api/addQuestionExamen/", function(req,res){
	req.session.nbQuestionsCourant ++;
	res.json({});
});

router.get('/api/ajouteExamen/', function(req,res){
	console.log("Appel au service d'insertion d'examen");
	examens.insert(req.session.domaines, req.session.nombreQuestions, function(id){
		res.json({message: "Ajout d'un examen", id:id});
	});
});

router.get('/api/setNoteExamen/:id', function(req,res){
	console.log("Appel au service d'insertion de note");
	examens.ajouterNote(req.params.id, req.session.noteCourante, function(exam){
		res.json({message: "Ajout d'une note"});
	});
});


router.get('/api/Examens',function(req,res){
	console.log("Appel au service de récupération d'examen");
	examens.getAllExamens(function(examens){
		res.json({examens: examens});
	});
});

router.get('/api/StatsExamens',function(req,res){
	console.log("Appel au service de récupération des stats d'examens");
	examens.recupererStatsExamens(function(noteTotale, nbExams){
		if (nbExams == undefined)
			nbExams = 0;
		res.json({noteTotale: noteTotale, nbExams: nbExams});
	});
});

router.get('/api/StatsTests',function(req,res){
	console.log("Appel au service de récupération des stats des tests");
	res.json({	nbTests: req.session.nbQuestionsTests, 
				resultatsTests: req.session.noteTests});
});

router.get('/api/LastExamen', function(req,res){
	console.log("Appel au service de récupération du dernier examen");
	examens.getLastExamen(function(examen){ 
		if (examen == undefined)
		{
			note = 0;
			nombreQuestions = 0;
		}
		else
		{
			note = examen.note;
			nbQuestions = examen.nombreQuestions;
		}
		res.json({ note: note, 
				nbQuestions: nbQuestions}); 
	});
});

router.get('/api/StatsCourantes', function(req,res)
{
	res.json({
		note: req.session.noteCourante,
		nbQuestions: req.session.nombreQuestions
	});
});

router.get('/api/cleanExamens', function(req, res){
	examens.clean(function(){
		res.json({});
	});
});

module.exports = router;
