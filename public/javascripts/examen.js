$(document).ready(function ()
{
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
				$('.questionnaire').attr('action', 'results');
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


function changeCSSReponses()
{
	$('input:radio[value="true"]').parent().css('background-color', 'rgba(18,147,36,0.7)');
	$('input:radio[value="false"]').parent().css('background-color', 'rgba(204,0,0,0.7)');
}
