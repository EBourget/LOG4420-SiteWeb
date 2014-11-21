var random = require('mongoose-simple-random');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Question = new Schema({
	domaine : String,
	reponses : Array,
	bonneReponse : Number,
});
Question.plugin(random);

var ModeleQuestion = mongoose.model('modeleQuestion', Question);

exports.insertQuestion = function(req, res, callback){
	var modele = new ModeleQuestion();
	modele.domaine = req.param('domaine');
	modele.reponses = Array();
	modele.bonneReponse = req.param('reponse');
	modele.save();
	callback();
};



exports.getQuestionAleatoireTest = function(callback){
	Question.findOneRandom(function(err, result) {
	if (!err) {
		callback();
  }
});
