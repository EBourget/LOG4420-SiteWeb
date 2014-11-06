function afficheQuestion(question)
{
	$('#nomDomaine').text(baseDomaines[question.domaine]); // nom du domaine
	$('#enonceQuestion').text(question.question); // enonce de la question
	// affichage des choix
	for(i=0; i < question.choix.length; i++)
	{
		$("#listeChoix").append("<label for='reponse"+i
								+"'><input type='radio' name='reponse' id='reponse"+i
								+"' value='"+(i==question.reponse)+"'>"
								+question.choix[i]
								+"</label>");
	}

};

function changeCSSReponses()
{
	$('input:radio[value="true"]').parent().css('background-color', 'rgba(18,147,36,0.7)');
	$('input:radio[value="false"]').parent().css('background-color', 'rgba(204,0,0,0.7)');
}