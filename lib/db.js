// On crée l'objet Question vide
function Question(domaine, question, choix, reponse) {
 this.domaine = domaine; //id du domaine dans le tableau des domaines
 this.question = question;
 this.choix = choix;
 this.reponse = reponse; //correspond au numéro de la réponse
}

// type examen
function Examen(domaine, note, nombreQuestions) {
	this.domaine = domaine;
	this.note = note;
	this.nombreQuestions = nombreQuestions;
}

//domaines
var baseDomaines = ["HTML","CSS","JavaScript"];
//création des différentes questions (questions présentes dans les quizz w3Scools)
quest0= new Question(0,"What is the previous version of HTML, prior to HTML5?", ["HTML 4.01", "HTML 4", "HTML 4.1", "HTML 4.9"], 2);
quest1= new Question(0,"What does HTML stand for?", ["Hyper Text Markup Language","Hyperlinks and Text Markup Language","Home Tool Markup Language"], 0);
quest2= new Question(0,"Which HTML5 element is used to specify a footer for a document or section",["<footer>","<bottom>","<section>"],0);
quest3= new Question(0,"In HTML5, onblur and onfocus are:",["HTML elements","Event attributes","Style attributes"],1);
quest4= new Question(1,"What does CSS stand for?",["Creative Style Sheets","Computer Style Sheets","Cascading Style Sheets","Colorful Style Sheets"],2);
quest5= new Question(1,"Where in an HTML document is the correct place to refer to an external style sheet?", ["In the <head> section","At the top of the document","At the end of the document","In the <body> section"],0);
quest6= new Question(1,"Which HTML tag is used to define an internal style sheet?",["<script>","<css>","<style>"],2);
quest7= new Question(2,"Inside which HTML element do we put the JavaScript?",["<scripting>","<js>","<javascript>","<script>"],3);
quest8= new Question(2,"Where is the correct place to insert a JavaScript?",["The <body> section","<head> or <body> are correct","The <head> section"],1);
quest9= new Question(2,"How does a WHILE loop start?",["while (i <= 10)","while i = 1 to 10","while (i <= 10; i++)"],0);

var listeQuestions = [quest0, quest1, quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9]; // totalité des questions (utilisées pour les tests)

var questionsExamen;

// renvoie la ième question
function getQuestionById(i)
{
	return listeQuestions[i];
}

function getNombreQuestions()
{
	return listeQuestions.length;
}

function getDomaineById(i)
{
	return baseDomaines[i];
}

function getNombreDomaines()
{
	return baseDomaines.length;
}

function getQuestionAleatoireTest()
{
	var idQuestion = Math.floor(Math.random()*listeQuestions.length);
	return getQuestionById(idQuestion);
}

function getQuestionAleatoireExamen(questions)
{
	var idQuestionInTab = Math.floor(Math.random()*questions.length); // on choisit un nombre au hasard entre 0 et la taille de questions
	var idQuestion = questions.splice(idQuestionInTab,1); // on extrait l'élément 'tiré' au hasard
	return idQuestion;
}

function getQuestionsExamen(sujets)
{
	var questions = new Array();
	for(j=0;j<sujets.length; j++)
	{
		domaine = sujets[j];
		for(var i =0; i<listeQuestions.length; i++)
		{
			if(getDomaineById(getQuestionById(i).domaine) == domaine)
				questions.push(i); //on stocke uniquement les indices des questions
		}// on ajoute les questions correspondant au domaine
	}
	return questions;
}

exports.getQuestionById = getQuestionById;
exports.getNombreQuestions = getNombreQuestions;
exports.getDomaineById = getDomaineById;
exports.getNombreDomaines = getNombreDomaines;
exports.getQuestionAleatoireTest = getQuestionAleatoireTest;
exports.getQuestionAleatoireExamen = getQuestionAleatoireExamen;
exports.getQuestionsExamen = getQuestionsExamen;

