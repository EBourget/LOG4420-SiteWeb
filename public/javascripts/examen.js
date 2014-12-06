Quiz.controller('QuestionController', function($scope, $http, AjouterModel){
	var idQuestion;
	var idExam;
	var fin;
	var vanilla;
	var miseAJour = function()
	{
		AjouterModel.getNoteCourante($http, function(data)
		{
			$scope.note = data.note;
			$scope.nbQuestions = data.nbQuestions;
			if(!data.examenTermine)
			{
				$("#valider").text("Question Suivante");
			}
			else
			{
				$("#valider").text("Résultats de l'examen");
				$("#valider").attr("href","/results");
				fin = true;
				AjouterModel.setNoteExamen(idExam, $http, function(){});
			}
		});
	}
	// modèle de la question
	var nouvelleQuestion = function()
	{
		AjouterModel.getQuestionAleatoireExamen($http, function(data)
		{
			$scope.domaine = data.domaine;
			$scope.enonce = data.enonce;
			$scope.reponseList = data.reponses;
			idQuestion = data.id;
		});
	}
	// correction de la question
	var corriger = function()
	{
		AjouterModel.getBonneReponse($http, idQuestion, function(data)
		{
			var reponses = $("input[type='radio']");
			var idReponse = data.reponse;
			var estCorrect;
			AjouterModel.addQuestionExamen($http, function(){
				for(i = 0; i< reponses.length; i++)
				{
					if(parseInt($(reponses[i]).attr('id')) == idReponse)
					{
						$(reponses[i]).parent().css('background-color', 'rgba(18,147,36,0.7)');
						estCorrect = $(reponses[i]).is(':checked');
					}
					else
						$(reponses[i]).parent().css('background-color', 'rgba(204,0,0,0.7)');
				}
				if(estCorrect)
					AjouterModel.addBonneReponseExamen($http, function(){
						miseAJour();
					});
				else
					miseAJour();			
			});	
		});
	};
	// on crée un nouvel examen avec les variables de la session
	AjouterModel.ajouteExamen($http, function(dataId)
	{
		idExam = dataId;
		// initialisation
		nouvelleQuestion();
		$("#valider").text("Corriger");
		vanilla = false;
		fin = false;
		$scope.note = 0;
		$scope.nbQuestions = 0;
	});
	
	$scope.action = function(){
		if(!fin)
		{
			if(vanilla)
			{
				nouvelleQuestion();
				$("#valider").text("Corriger");
				vanilla = false;
			}
			else
			{
				corriger();
				vanilla = true;
			}
		}
	};	
});

Quiz.service('AjouterModel', function(){
	this.getQuestionAleatoireExamen = function(service, callback){
		var response = service.get("/api/getQuestionAleatoireExamen/");
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
	this.addBonneReponseExamen = function(service, callback)
	{
		var response = service.get("/api/addBonneReponseExamen/");
		response.success(function(data, status, headers, config){
			callback();
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.addQuestionExamen = function(service, callback)
	{
		var response = service.get("/api/addQuestionExamen/");
		response.success(function(data, status, headers, config){
			callback();
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.ajouteExamen = function(service, callback)
	{
		var response = service.get("/api/ajouteExamen/");
		response.success(function(data, status, headers, config){
			callback(data.id);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.setNoteExamen = function(id, service, callback)
	{
		var response = service.get("/api/setNoteExamen/"+id);
		response.success(function(data, status, headers, config){
			callback();
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
});
