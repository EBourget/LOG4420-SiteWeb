Quiz.controller('ResultsController', function($scope, $http, ModeleResultat){
	ModeleResultat.lastExamen($http, function(data)
	{
		$scope.note = data.note;
		$scope.nbQuestions = data.nbQuestions;
		var note = data.note/data.nbQuestions;
		if (note <= 0.25) {
			$scope.message = "C'est nul !";
		}
		else if (note <= 0.50) {
			$scope.message = "C'est pas bien !";
		}
		else if (note <= 0.75) {
			$scope.message = "C'est bien !";
		}
		else{
			$scope.message = "C'est très bien !";
		}
	});
});

Quiz.service('ModeleResultat', function(){
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
});