var db = require('../lib/db');

var Examen = new db.Schema({
	domaine : String,
	note : Number,
	nombreQuestions : Number
});

var Global = new db.Schema({
	moyenneExamens : Number,
	nbQuestions : Number,
	nbBonnesResponsesTests : Number,
	nbTests : Number,
	nbTestsJustes : Number,
	nbQuestionsTests : Number,
	nbQuestionsRépondues : Number,
	nbQuestionsDernierExamen : Number,
	nbReponsesJustesDernierExamen : Number,
	nbQuestionsJustes : Number,
	nbExamens : Number,
});

var ModeleExamen = db.mongoose.model('Examen', 	Examen);
var ModeleGlobal = db.mongoose.model('Global', Global);



module.export.insert = function(domaine, nombreQuestions, callback){ 
	var modele = new ModeleExamen();
	modele.domaine = domaine;
	modele.nombreQuestions = nombreQuestions;
	modele.note = 0;
	modele.save(function (err) {
		if (err) console.log('Erreur');
		console.log("Insertion de statistiques d'examen");
	});

	global = ModeleGlobal.find({}, function(err, glob){
		if(!err)
			return(glob);
	});

	global.nbQuestionsDernierExamen : nombreQuestions;
	global.nbReponsesJustesDernierExamen : 0;
	global.moyenneExamens = global.moyenneExamens * global.nbExamens / (global.nbExamens +1);
	global.nbExamens++;
	global.save(function (err) {
		if (err) console.log('Erreur');
		console.log("Mise à jour des statistiques d'examen");
	});
	callback();
};

module.export.ajouterNote = function(domaineE, note, nombreQuestionsE, callback){
	exam = ModeleExamen.find({domaine: domaineE, note: 0, nombreQuestions: nombreQuestionsE}, function(err, docs){
		if(!err)
			return(docs);
	});
	exam.note = note;
	modele.save(function (err) {
		if (err) console.log('Erreur');
		console.log("Ajout de la note à l'examen");
	});
	callback();
};

module.export.getAllExamns = function(callback()){
	ModeleQuestion.find({}, function(err, exams){
		if(!err)
			callback(exams);
	});
}

module.export.mettreAJourStatsExamen = function(callback()){
	exam = ModeleExamen.findOne({domaine: domaineE, note: 0, nombreQuestions: nombreQuestionsE}, function(err, docs){
		if(!err)
			return(docs);
	});
	exam.note = note;
	modele.save(function (err) {
		if (err) console.log('Erreur');
		console.log("Ajout de la note à l'examen");
	});
	callback();
};