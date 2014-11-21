var random = require('mongoose-simple-random');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Question = new Schema({
	enonce : String,
	domaine : String,
	reponses : Array,
	bonneReponse : Number,
});
Question.plugin(random);

var ModeleQuestion = mongoose.model('modeleQuestions', Question);

exports.insert = function(enonce, domaine, choix, reponse, callback){
	var modele = new ModeleQuestion();
	modele.enonce = enonce;
	modele.domaine = domaine;
	modele.reponses = choix;
	modele.bonneReponse = reponse;
	modele.save();
	callback();
};



exports.getAleatoireTest = function(callback){
	Question.findOneRandom(function(err, result) {
	if (!err) {
		callback();
  }
})
};
