$(document).ready(function ()
{
	var idQuestion = Math.floor(Math.random()*listeQuestions.length);
	afficheQuestion(listeQuestions[idQuestion]);
	// Affichage de la note
	$('#note').text(localStorage['nombreBonnesReponsesTests'] + "/" + localStorage['nombreQuestionsTests']);

	// Variable servant à l'habillage du bouton de validation de question
	var vanilla = true;
	
	function corrigerTests(a, event) {
		if(vanilla){
			// On retire l'envoi du formulaire pour cette fois
			event.preventDefault();

			// Changement des couleurs d'arrière-plan des réponses
			changeCSSReponses();

			// Traitement des réponses : mise à jour des données du test courant et des données totales
			if($('input:checked').val() == "true"){
				localStorage["nombreBonnesReponsesTests"]++;
				localStorage['nombreTestsJustes'] ++;
			}
			localStorage['nombreQuestionsTests']++;
			a.value='Question suivante';
			localStorage['nombreTests'] ++;
			
			// La prochaine fois, il faudra envoyer le formulaire 
			vanilla = false;
		}
		else{
			$('.questionnaire').submit();
		}
	};
	
	$('#valider').click(function(event) {corrigerTests(this, event);});	
});