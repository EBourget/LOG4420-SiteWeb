Quiz.controller('QuestionController', function($scope, $http, AjouterModel){
	var id;

	// modèle de la question
	var nouvelleQuestion = function()
	{
		AjouterModel.getQuestionAleatoire($http, function(data)
		{
			$scope.domaine = data.domaine;
			$scope.enonce = data.enonce;
			$scope.reponseList = data.reponses;
			id = data.id;
		});
	}
	// correction de la question
	var corriger = function()
	{
		AjouterModel.getBonneReponse($http, id, function(data)
		{
			var reponses = $("input[type='radio']");
			var idReponse = data.reponse;
			AjouterModel.addQuestionTest($http, function(){
				for(i = 0; i< reponses.length; i++)
				{
					if(parseInt($(reponses[i]).attr('id')) == idReponse)
					{
						$(reponses[i]).parent().css('background-color', 'rgba(18,147,36,0.7)');
						if(($(reponses[i])).is(':checked'))
							AjouterModel.addBonneReponse($http, function(){});
					}
					else
						$(reponses[i]).parent().css('background-color', 'rgba(204,0,0,0.7)');
					AjouterModel.getNoteCourante($http, function(data)
					{
						$scope.note = data.note;
						$scope.nbQuestions = data.nbQuestions;
					});

				}					
			});	
		});
	};

	// initialisation
	nouvelleQuestion();
	$("#valider").val("Corriger");
	vanilla = false;
	$scope.note = 0;
	$scope.nbQuestions = 0;

	$scope.action = function(){
		if(vanilla)
		{
			nouvelleQuestion();
			$("#valider").val("Corriger");
			vanilla = false;
		}
		else
		{
			corriger();
			$("#valider").val("Question Suivante");
			vanilla = true;
		}
	};	
});

Quiz.service('AjouterModel', function(){
	this.getQuestionAleatoire = function(service, callback){
		var response = service.get("/api/getQuestionAleatoire/");
		response.success(function(data, status, headers, config){
			callback(data);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.getNoteCourante = function(service, callback)
	{
		var response = service.get("/api/getNoteTest/");
		response.success(function(data, status, headers, config){
			callback(data);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.getBonneReponse = function(service, id, callback){
		var response = service.get("/api/getBonneReponse/"+id);
		response.success(function(data, status, headers, config){
			callback(data);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.addBonneReponse = function(service, callback)
	{
		var response = service.get("/api/addBonneReponseTest/");
		response.success(function(data, status, headers, config){
			callback();
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.addQuestionTest = function(service, callback)
	{
		var response = service.get("/api/addQuestionTest/");
		response.success(function(data, status, headers, config){
			callback();
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
});
