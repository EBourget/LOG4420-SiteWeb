var db = require('../lib/db');

var Examen = new db.Schema({
	domaine : String,
	note : Number,
	nombreQuestions : Number,
	date : Number
});

var ModeleExamen = db.mongoose.model('Examen', 	Examen);

module.exports.insert = function(domaine, nombreQuestions, callback){ 
	console.log("Entrée dans la fonction d'insertion");
	var exam = new ModeleExamen();
	exam.domaine = domaine;
	exam.nombreQuestions = nombreQuestions;
	exam.note = 0;
	var date = new Date();
	exam.date = date.getTime();
	console.log(exam);
	exam.save(function (err) {
		if (err) console.log('Erreur');
		console.log("Insertion de statistiques d'examen");
	});
	callback();
};

// Une fois que tu pourras passer la date par le local storage (ou l'id si tu veux) via la session, remplace les deux premières lignes de la fonction par ce que j'ai commenté et ça devrait marcher
//
// module.exports.ajouterNote = function(date, noteE, callback){
// 	ModeleExamen.findOne({date: date}, function(err, doc){
module.exports.ajouterNote = function(domaineE, noteE, nombreQuestionsE, callback){
	ModeleExamen.findOne({domaine: domaineE, note: 0, nombreQuestions: nombreQuestionsE}, function(err, doc){
		doc.note = noteE;
		console.log("Ajout d'une note à un examen");
		doc.save();
		callback();
	});
};

module.exports.getAllExamens = function(callback){
	ModeleExamen.find({}, function(err, exams){
		if(!err)
			callback(exams);
	});

}
module.exports.getLastExamen = function(callback){
	ModeleExamen.findOne({}, {}, {sort: {date: -1}}, function(err, exam){
		if(!err)
			callback(exam);
	});
}

module.exports.recupererStatsExamens = function(callback){
	var nbExamens = 0;
	var noteTotale = 0;
	ModeleExamen.find({}, function(err, docs){
		if(err) return;
		for (var i = docs.length - 1; i >= 0; i--) {
			nbExamens++;
			noteTotale += docs[i].note;
		};
		callback(nbExamens, noteTotale);
	});
};