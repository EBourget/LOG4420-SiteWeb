Quiz.controller('StatController', function($scope, $http, ModeleStat){
	ModeleStat.getAllExamens($http, function(data1)
	{
		$scope.examens = data1.examens;
		ModeleStat.statsExamens($http, function(data2)
		{
			$scope.nombreExamens = data2.nbExams;
			if(data2.nbExams != 0)
				$scope.moyenneExamens = ((data2.noteTotale/data2.nbExams)*20).toFixed(1);
			else
				$scope.moyenneExamens = 0;
			ModeleStat.statsTests($http, function(data3)
			{
				if(data3.nbTests != 0)
					$scope.pourcentageTestsReussis = ((data3.resultatsTests/data3.nbTests)*100).toFixed(1);
				else
					$scope.pourcentageTestsReussis = 0.0;
				ModeleStat.lastExamen($http, function(data4)
				{
					$scope.noteDernierExamen = data4.note;
					$scope.nbQuestionsExamen = data4.nbQuestions;
				});
			});
		});
	});

	$scope.clear = function()
	{
		ModeleStat.clean($http, function(){});
	};
});

Quiz.service('ModeleStat', function(){
	this.getAllExamens = function(service, callback)
	{
		var response = service.get('/api/Examens');
		response.success(function(data, status, headers, config){
			callback(data);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.statsExamens = function(service, callback)
	{
		var response = service.get('/api/StatsExamens');
		response.success(function(data, status, headers, config){
			callback(data);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.statsTests = function(service, callback)
	{
		var response = service.get('/api/StatsTests');
		response.success(function(data, status, headers, config){
			callback(data);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.lastExamen = function(service, callback)
	{
		var response = service.get('/api/LastExamen');
		response.success(function(data, status, headers, config){
			callback(data);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
	this.clean = function(service, callback)
	{
		var response = service.get('/api/cleanExamens');
		response.success(function(data, status, headers, config){
			callback(data);
		});
		response.error(function(data, status, headers, config){
			alert('Problème avec AJAX');
		});
	};
});