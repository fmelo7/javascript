/* main js app */
'use strict';

var app = angular.module('App', [ 'ngMaterial', 'ngMessages' ]);

app.config([ '$mdThemingProvider', '$mdIconProvider', function($mdThemingProvider, $mdIconProvider) {
	$mdIconProvider.fontSet('md', 'material-icons');

	//$mdThemingProvider.theme('default').primaryPalette('deep-orange').accentPalette('amber');
	$mdThemingProvider.theme('default').primaryPalette('yellow').accentPalette('indigo');
	//$mdThemingProvider.theme('default').primaryPalette('red').accentPalette('indigo');
	//$mdThemingProvider.theme('default').primaryPalette('teal').accentPalette('lime');
	$mdThemingProvider.theme('theme1').primaryPalette('lime').accentPalette('orange');
	$mdThemingProvider.theme('theme2').primaryPalette('blue-grey');
	$mdThemingProvider.theme('theme3').primaryPalette('amber').accentPalette('deep-orange');

	$mdThemingProvider.enableBrowserColor();

}]);

app.controller('MyCardController', [ '$scope', function($scope) {
	$scope.theme = $scope.theme || 'default';
}]);

app.directive('myCard', function() {
	return {
	    restrict : 'E',
	    templateUrl : 'public/myCard.tmpl.html',
	    scope : {
	        name : '@',
	        description : '@',
	        theme : '@'
	    },
	    controller : 'MyCardController'
	}
});

app.controller("AppController", [ '$scope', '$mdSidenav', '$interval', function($scope, $mdSidenav, $interval) {
	$scope.toggleLeft = buildToggler('left');
	$scope.toggleRight = buildToggler('right');

	function buildToggler(componentId) {
		return function() {
			$mdSidenav(componentId).toggle();
		}
	}

	$scope.determinateValue = 0;
	$interval(function() {
		if ($scope.determinateValue < 100) {
			$scope.determinateValue += ((100 - $scope.determinateValue) * 0.25);
		}
	}, 100, 0, true);
}]);

app.service('SignInService', [ '$http', function($http) {
	return {
		signin : function(vo) {
			$http({
		        url : '/public/signinUser',
		        method : "POST",
		        data : vo
		    }).then(function(response) {
			    // success
		    	return response.data.message;
		    }, function(response) { // optional
			    // failed
		    	return response.data.message;
		    });
	    },
	}
}]);

app.controller('SignInController', [ '$scope', 'SignInService', function($scope, SignInService) {
	var vm = $scope.vm = {};
	vm.signin = function(vo) {
		SignInService.signin(vo);
	}
}]);

app.directive('passwordVerify', function() {
	return {
		restrict : 'A', // only activate on element attribute
		require : '?ngModel', // get a hold of NgModelController
		link : function(scope, elem, attrs, ngModel) {
			if (!ngModel)
				return; // do nothing if no ng-model

			// watch own value and re-validate on change
			scope.$watch(attrs.ngModel, function() {
				validate();
			});

			// observe the other value and re-validate on change
			attrs.$observe('passwordVerify', function(val) {
				validate();
			});

			var validate = function() {
				// values
				var val1 = ngModel.$viewValue;
				var val2 = attrs.passwordVerify;

				// set validity
				ngModel.$setValidity('passwordVerify', val1 === val2);
			};
		}
	};
});

app.directive('usernameAvailable', function($timeout, $q, $http) {
	return {
	    restrict : 'AE',
	    require : 'ngModel',
	    link : function(scope, elm, attr, model) {
		    model.$asyncValidators.usernameAvailable = function() {
			    return $http.get('/public/usernameVerify?username='+model.$viewValue).then(function(res) {
			        +$timeout(function() {
			    	    model.$setValidity('usernameAvailable', !res.data.exists);
			        }, 1000);
			    });
		    };
	    }
	}
});