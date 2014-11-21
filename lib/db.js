var questions = require('mongoose');
var Schema = questions.Schema;

var Domaine = new Schema({
	id : Number,
	nom : String,
});

var Question = new Schema({
	id : Number,
	domaine : Schema.ObjectId,
	reponses : Array,
	bonneReponse : Number,
});