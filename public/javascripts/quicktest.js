Quiz.controller('QuestionController', function($scope, $http, AjouterModel){
	var id;
	var miseAJour = function()
	{
		AjouterModel.getNoteCourante($http, function(data)
		{
			$scope.note = data.note;
			$scope.nbQuestions = data.nbQuestions;
		});
	}
	// modèle de la question
	var nouvelleQuestion = function()
	{
		console.log('nouvelleQuestion');
		AjouterModel.getQuestionAleatoireTest($http, function(data)
		{
			$scope.domaine = data.domaine;
			$scope.enonce = data.enonce;
			$scope.reponseList = data.reponses;
			// on réinitialise la présentation
			var reponses = $("input[type='radio']");
			for(i = 0; i< reponses.length; i++)
			{
				$(reponses[i]).parent().removeClass('bonneReponse mauvaiseReponse');
				$(reponses[i]).attr('checked',false);
			}
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
			var estCorrect;
			AjouterModel.addQuestionTest($http, function(){
				for(i = 0; i< reponses.length; i++)
				{
					if(parseInt($(reponses[i]).attr('id')) == idReponse)
					{
						$(reponses[i]).parent().addClass('bonneReponse'); 
						estCorrect = $(reponses[i]).is(':checked');
					}
					else
						$(reponses[i]).parent().addClass('mauvaiseReponse');
				}
				if(estCorrect)
					AjouterModel.addBonneReponseTest($http, function(){
						miseAJour();
					});
				else
					miseAJour();	
			});	
		});
	};

	// initialisation
	nouvelleQuestion();
	$("#valider").text("Corriger");
	vanilla = false;
	$scope.note = 0;
	$scope.nbQuestions = 0;

	$scope.action = function(){
		if(vanilla)
		{
			nouvelleQuestion();
			$("#valider").text("Corriger");
			vanilla = false;
		}
		else
		{
			corriger();
			$("#valider").text("Question Suivante");
			vanilla = true;
		}
	};	
});

Quiz.service('AjouterModel', function(){
	this.getQuestionAleatoireTest = function(service, callback){
		var response = service.get("/api/getQuestionAleatoireTest/");
		response.success(function(data, status, headers, config){
			callback(data);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.getNoteCourante = function(service, callback)
	{
		var response = service.get("/api/getNote/");
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
	this.addBonneReponseTest = function(service, callback)
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
