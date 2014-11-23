var nbReponses = 2;

$(document).ready(function(){
	$('#ajouterReponse').click(function(e){
		e.preventDefault();
		ajouterReponse();
	});
	$('div').on('click', '.supprimerReponse', function(e){
		if(nbReponses == 2)
			return;
		id = parseInt($(this).attr('id'));
		supprimerReponse(id);
		renommerReponses(id);
	});
	$('div').on('click', 'input:radio', function(e){
		id = parseInt($(this).attr('value'));
		$('input.choix').css('background-color', 'red');
		$('input#reponse'+id).css('background-color', 'green');
	});
});

function ajouterReponse(){
	$('#reponses').append('<div><input type="radio" name="reponse" value="'+ nbReponses +'"/><input type="text" class="choix" name="choix" id="reponse'+ nbReponses +'" /><a id="'+ nbReponses +'" class="supprimerReponse">Supprimer réponse</a></div>');
	nbReponses++;
}

function supprimerReponse (id) {
	$('#reponse'+id).parent().remove();
}

function renommerReponses(id){
	for(i = id; i<nbReponses-1; i++){
		j = i+1;
		$('#reponse'+j).attr('name', 'reponse'+i);
		$('#reponse'+j).attr('id', 'reponse'+i);
		$('a#'+j).attr('id', i);
		$('input:radio[value='+j+']').attr('value', i);
	}
	nbReponses --;
};