var random = require('mongoose-simple-random');

var db = require('../lib/db');

var Question = new db.Schema({
	enonce : String,
	domaine : String,
	reponses : Array,
	bonneReponse : Number,
});
Question.plugin(random);

var ModeleQuestion = db.mongoose.model('Questions', Question);

module.exports.insert = function(enonce, domaine, choix, reponse, callback){
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

module.exports.getQuestionById = function(id, callback){
	ModeleQuestion.findOne({_id: id}, function(err, doc){
		if(err) return;
		console.log(doc);
		callback(doc);
	});
};

module.exports.getQuestionAleatoireTest = function(callback){
	return ModeleQuestion.findOneRandom(function(err, result) {
	if (!err)
		callback(result);
  	});
};

module.exports.getQuestionAleatoireExamen = function(questions)
{
	var idQuestionInTab = Math.floor(Math.random()*questions.length); // on choisit un nombre au hasard entre 0 et la taille de questions
	var question = questions.splice(idQuestionInTab,1); // on extrait l'élément 'tiré' au hasard
	return question;
};

module.exports.getQuestionsDomaine = function(domaineQuestion, callback){
	ModeleQuestion.find({domaine: domaineQuestion}, function(err, docs){
		if(!err)
			callback(docs);
	});
};

module.exports.getQuestionsExamen = function(domaines, callback)
{
	ModeleQuestion.find({domaine: {$in: domaines}}, function(err, docs){
		if(!err)
			callback(docs);
	});
};