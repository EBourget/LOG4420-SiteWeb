if (localStorage['moyenneExamens'] == undefined) {localStorage['moyenneExamens'] = 0};
if (localStorage['nbExamens'] == undefined) {localStorage['nbExamens'] = 0};
if (localStorage['examens'] == undefined) {localStorage['examens'] = JSON.stringify([])};
if (localStorage['nombreTests'] == undefined) {localStorage['nombreTests'] = 0};
if (localStorage['nombreTestsJustes'] == undefined) {localStorage['nombreTestsJustes'] = 0};

$(document).ready(function()
{
	// Affichage des propositions de domaines pour les examens
	for (i =0; i<baseDomaines.length; i++)
		$("#choixDomaines").append("<input type='checkbox' name='"+i+"' id='"+i+"' value='"+i+"'>"+baseDomaines[i]);
	
	// Affichage des statistiques
	var moyenneSurVingt = (localStorage['moyenneExamens']*20).toFixed(1);
	$('#pourcentageTestsReussis').text(localStorage['pourcentageTestsReussis']);
	$('#moyenneExamens').text(moyenneSurVingt + "/20");
	$('#dernierExamen').text(localStorage['dernierExamen']);
	$('#nombreExamens').text(localStorage['nbExamens']);
	if(localStorage['nombreTests'] != 0)
		pourcentageTests = (localStorage['nombreTestsJustes']*100/localStorage['nombreTests']).toFixed(1);
	else pourcentageTests = 0;
	$('#pourcentageTestsReussis').text(pourcentageTests + " %");

	// Affichage du détail es examens antérieurs
	var examens = JSON.parse(localStorage['examens']);
	for(i=0; i<examens.length; i++)
		$("#resultatsExamens").append("<li>Examen "+(i+1)+" ("+examens[i].domaine+") : " + examens[i].note + "/" + examens[i].nombreQuestions + "</li>");
});

$('#raz').click(function(event) {
	localStorage.clear();
});