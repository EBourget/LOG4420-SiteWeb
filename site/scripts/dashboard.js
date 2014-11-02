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
		nbQuestionsExam += nombreQuestions(domaines[i].value);
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
		idDomaine = domaines[i].value;
		ajouteQuestions(idDomaine); // on ajoute les questions correspondant au domaine
		mesDomaines = mesDomaines + baseDomaines[idDomaine];
		if (i != nombreDomaines - 1)
			mesDomaines += ", "; // on met à jour la chaine de caractères
	});
	// sauvegarde de la liste de question pour l'examen
	sessionStorage.setItem("questionsExamen", questionsExamen); 
	// Initialisation des paramètres de l'examen
	var nouvelExamen = new Examen(mesDomaines, 0, nbQuestionsUser);
	var examens = JSON.parse(localStorage['examens']);
	examens.push(nouvelExamen);
	localStorage['examens'] = JSON.stringify(examens);
	localStorage['nbExamens']++; // nombre d'examens passés
	localStorage['nbQuestions'] = nbQuestionsUser;
	localStorage['nbQuestionsRepondues'] = 0;
	localStorage['nbQuestionsJustes'] = 0;
	return true;
});

// ajoute les questions du domaine considéré au tableau questionsExamen
function ajouteQuestions(idDomaine) 
{
	for(var i =0; i<listeQuestions.length; i++)
	{
		if(listeQuestions[i].domaine == idDomaine)
			questionsExamen.push(i); //on stocke uniquement les indices des questions
	}
}

// compte le nombre de question d'un dommaine
function nombreQuestions(idDomaine)
{
	nbQuestions = 0;
	for(var i =0; i<listeQuestions.length; i++)
	{
		if(listeQuestions[i].domaine == idDomaine)
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