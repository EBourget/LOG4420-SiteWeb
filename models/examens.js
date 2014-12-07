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
	});
	callback(exam._id);
};

module.exports.ajouterNote = function(id, note,callback){
	ModeleExamen.findOne({_id: id}, function(err, doc){
		doc.note = note;
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
	var nbQuestions = 0;
	ModeleExamen.find({}, function(err, docs){
		if(err) return;
		for (var i = docs.length - 1; i >= 0; i--) {
			nbExamens++;
			nbQuestions += docs[i].nombreQuestions;
			noteTotale += docs[i].note;
		};
		callback(noteTotale, nbExamens, nbQuestions);
	});
};

module.exports.clear = function(callback)
{
	ModeleExamen.remove({}, function(err, exams){
		if(!err)
			callback();
	});
};