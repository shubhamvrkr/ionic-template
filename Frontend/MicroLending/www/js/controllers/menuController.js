mycontrollerModule.controller('menuCtrl', ['$scope', '$stateParams','$ionicPopover','$state','$ionicLoading','$timeout','ionicToast', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopover,$state,$ionicLoading,$timeout,ionicToast) {

	console.log("menuCtrl")
 // .fromTemplateUrl() method
	
  $ionicPopover.fromTemplateUrl('options-menu.html', {
    scope: $scope
  }).then(function(popover) {
	  
    $scope.popover = popover;
  });
 document.body.classList.add('platform-android');


  $scope.openPopover = function($event) {
   
	  
	  $scope.popover.show($event);
  };
	
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
	
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remov-e();
  });
	
  // Execute action on hidden popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
	
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });	
	
  $scope.exportProfile = function(){
	  
	  console.log("exportProfile");
	  $scope.closePopover();
	  $ionicLoading.show({
				templateUrl: 'templates/loading.html',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
	  });
	  $timeout(function () {
			
			$ionicLoading.hide();
			ionicToast.show('Profile exported at /data/Micro-Lending/profile', 'bottom', true, 2500);
    
	  }, 2000);
	  
  }
  
  $scope.Logout = function(){
	  
	  
	  console.log("Logout");
	  $scope.closePopover();
	  $state.go('login');
  }
	
	
	
	
}])