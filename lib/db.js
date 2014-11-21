var questions = require('mongoose');
var url = 'mongodb://EBourget:LOG4410@ds027748.mongolab.com:27748/log4420';

mongoose.connect('url');

var Schema = questions.Schema;

var Domaine = new Schema({
	nom : String,
});

var Question = new Schema({
	domaine : Schema.ObjectId,
	reponses : Array,
	bonneReponse : Number,
});

var ModeleDomaine = mongoose.model('modeleDomaine', Domaine);
var ModeleQuestion = mongoose.model('modelQuestion', Question);

exports.get

exports.insertQuestion = function(req, res, callback){
	var modele = new ModeleQuestion();
	modele.domaine = req.param('domaine');
	modele.reponses = Array();
	while('');
	modele.bonneReponse = req.param('reponse');
	modele.save();
	callback();
};

