
$(document).ready(function() {
	// Affichage de la note
	$('#note').text(localStorage['nbQuestionsJustes'] + "/" + localStorage['nbQuestions']);

	//Calcul de la moyenne : chaque examen à la même pondération, indépendamment du nombre de questions
	var moyenneTotale = ((localStorage['moyenneExamens'] * (localStorage['nbExamens'] -1)) + (localStorage['nbQuestionsJustes'] / localStorage['nbQuestions']))/ localStorage['nbExamens']; 

	// Stockage des statistiques
	var examens = JSON.parse(localStorage['examens']);
	examens[localStorage['nbExamens']-1].note = localStorage['nbQuestionsJustes']; 
	localStorage['examens'] = JSON.stringify(examens); // on sauvegarde la nouvelle note
	localStorage['moyenneExamens'] = moyenneTotale;
	localStorage['dernierExamen'] = localStorage['nbQuestionsJustes'] + "/" + localStorage['nbQuestions'];

	// Affichage message
	var note = (localStorage['nbQuestionsJustes'])/(localStorage['nbQuestions']);
	if (note <= 0.25) {
		$('#message').text("C'est nul !")
	}
	else if (note <= 0.50) {
		$('#message').text("C'est pas bien !")
	}
	else if (note <= 0.75) {
		$('#message').text("C'est bien !")
	}
	else{
		$('#message').text("C'est très bien !")
	};
});