var questionsExamen = new Array;

// fonction pour la vérification du formulaire pour l'examen (tableau de bord)
$("#formExamen").submit(function verifForm()
{
	$("#alerteSujet").css("display","inline-block").fadeTo( "fast", 0 ).css("display","none");
	$("#alerteQuestions").css("display","inline-block").fadeTo( "fast", 0 ).css("display","none");
	var domaines = $("input:checked");
	var mesDomaines = ""; // chaine de caractères contenant les noms des domaines séparés par des ','
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
	// on récupère les questions correspondant au(x) domaine(s) choisi(s)
	domaines.each( function(i)
	{
		mesDomaines+= domaines[i].value;
		if (i != nombreDomaines - 1)
			mesDomaines += ", "; // on met à jour la chaine de caractères
	});
	// Initialisation des paramètres de l'examen
	var nouvelExamen = new Examen(mesDomaines, 0, nbQuestionsUser);
	var examens = JSON.parse(localStorage['examens']);
	examens.push(nouvelExamen);
	localStorage['examens'] = JSON.stringify(examens);
	localStorage['nbExamens']++;
	var moyenneTotale = (localStorage['moyenneExamens'] * (localStorage['nbExamens'] -1)) / localStorage['nbExamens'];
	localStorage['moyenneExamens'] = moyenneTotale;
	localStorage['nbQuestions'] = nbQuestionsUser;
	localStorage['dernierExamen'] = "0/"+nbQuestionsUser;
	localStorage['nbQuestionsRepondues'] = 0;
	localStorage['nbQuestionsJustes'] = 0;
	return true;
});

// compte le nombre de question d'un dommaine
function nombreQuestions(domaine) // si c'est possible récupérer la taille du tableau obtenu !!!
{
	nbQuestions = 0;
	for(var i =0; i<getNombreQuestions(); i++) // ==> il faut pouvoir récupérer le nombre de questions présentes dans la BD
	{
		if(getDomainesById(getQuestionById(i).domaine) == domaine) // ==> pour que ça fonctionne il faudrait pouvoir avoir accès aux questions et aux domaines dans la BD
			nbQuestions++;
	}
	return nbQuestions;
}

$("#formTest").click(function ()
{ 
	// Initialisation des paramètres du test rapide
	localStorage['nombreQuestionsTests'] = 0;
	localStorage['nombreBonnesReponsesTests'] = 0;
	return true;
});