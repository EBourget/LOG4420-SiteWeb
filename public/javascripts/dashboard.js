var questionsExamen = new Array;

// fonction pour la vérification du formulaire pour l'examen (tableau de bord)
$("#formExamen").submit(function verifForm()
{
	$("#alerteSujet").css("display","inline-block").fadeTo( "fast", 0 ).css("display","none");
	$("#alerteQuestions").css("display","inline-block").fadeTo( "fast", 0 ).css("display","none");
	var domaines = $("input:checked");
	var nombreDomaines = domaines.length;
	var nbQuestionsExam = 0;
	if ( nombreDomaines == 0)
	{
		$("#alerteSujet").css("display","inline-block").fadeTo( "fast", 1 );
		return false;
	}
	// on compte le nombre de questions
	domaines.each( function(i)
	{
		nbQuestionsExam += $(domaines[i]).data('max');
	});
	nbQuestionsUser = parseInt($("#nombre_questions").val());
	if( nbQuestionsUser > nbQuestionsExam)
	{//on vérifie que le nombre de question choisi est inférieur au nombre de questions disponibles
		$("#alerteQuestions").css("display","inline-block").fadeTo( "fast", 1 );
		$("#maxQuestions").text(nbQuestionsExam);
		return false; 
	}
	return true;
});