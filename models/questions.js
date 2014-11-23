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
	modele.save(function (err) {
		if (err) console.log('Erreur');
		console.log('Insertion');
	});
	callback();
};

exports.getQuestionById = function(id, callback){
	Question.findOne({_id: id}, function(err, doc){
		if(err) return;
		console.log(doc);
		callback(doc);
	});
};

exports.getDomaine = function(idQuestion, callback){
	question = getQestionbyId(idQuestion, function(doc){return doc});
	callback(question.domaine);
};

exports.getAleatoireTest = function(callback){
	Question.findOneRandom(function(err, result) {
	if (!err) {
		callback();
  }
})
};

exports.getQuestionsDomaine = function(domaineQuestion, callback){
	Question.find({domaine: domaineQuestion}, function(err, docs){
		if(err) return;
		console.log(docs);
		callback(docs);
	});
};

exports.getMaxQuestionsDomaine = function(domaineQuestion, callback){
	Question.count({domaine: domaineQuestion}, function(err, nombre){
		if(err) return;
		console.log(nombre);
		callback(nombre);
	});
};