$(document).ready(function ()
{
	// Gestion des questions
	chaineQuestions = sessionStorage.getItem("questionsExamen");
	sessionStorage.clear;
	var questionsExamen = chaineQuestions.split(",");
	// choix aléatoire de la question
	idQuestionExam = Math.floor(Math.random()*questionsExamen.length);
	idQuestion = questionsExamen.splice(idQuestionExam,1);// on extrait la question du tableau de questions possibles
	sessionStorage.setItem("questionsExamen", questionsExamen); 
	questionRand = listeQuestions[idQuestion[0]];
	// affichage
	afficheQuestion(questionRand);
	// Affichage de la note
	$('#note').text(localStorage['nbQuestionsJustes'] + "/" + localStorage['nbQuestionsRepondues']);

	// Variable servant à l'habillage du bouton de validation de question
	var vanilla = true;
	
	function corrigerExamen(a, event) {
		if(vanilla){
			// On retire l'envoi du formulaire pour cette fois
			event.preventDefault();

			// Changement des couleurs d'arrière-plan des réponses
			changeCSSReponses();

			// Traitement des réponses
			if($('input:checked').val() == "true"){
				localStorage["nbQuestionsJustes"]++;
			}
			localStorage['nbQuestionsRepondues']++;
			
			// Décision de terminer ou non l'examen en fonction du nombre de questions restantes
			if (localStorage["nbQuestionsRepondues"] == localStorage['nbQuestions']) {
				a.value='Terminer';
				$('.questionnaire').attr('action', 'results.html');
			}
			else{
				a.value='Question suivante';
			}

			// La prochaine fois, il faudra envoyer le formulaire 
			vanilla = false;
		}
		else{
			$('.questionnaire').submit();
		}
	};

	$('#valider').click(function(event) {corrigerExamen(this, event);});
	$('#abandonner').click(function(event) {localStorage['nbQuestionsJustes'] = 0;});	// si on abandone, le nombre de réponses justes passe à 0.
});
