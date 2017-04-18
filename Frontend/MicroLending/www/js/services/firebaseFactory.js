angular.module('app.services')

.factory('firebaseFactory',['$http',function($http) {

         var service = {};

 function getToken (callback){

               messaging.getToken()
                   .then(function(currentToken) {
                     if (currentToken) {
                       callback({status:'1',token:currentToken});

                     } else {
                       // Show permission request.
                       console.log('No Instance ID token available. Request permission to generate one.');
                       // Show permission UI.
                        //updateUIForPushPermissionRequired(callback)
                        callback({status:'0'})

                     }
                   }).catch(function(err) {
                        console.log('An error occurred while retrieving token. ', err);
                        callback({status:'0'})

                      });
   }  
        
 service.getFirebaseToken = function(callback){
     callback({status:'1'})
             /*messaging.requestPermission()
             .then(function() {
               console.log('Notification permission granted.');
                getToken(callback)
                        
                     
             })
             .catch(function(err) {
               console.log('Unable to get permission to notify.', err);
                callback({status:'0'})
             });*/
   
 }
   
      function updateUIForPushPermissionRequired() {
                showHideDiv(tokenDivId, false);
                showHideDiv(permissionDivId, true);
         }
        
   
    function showHideDiv(divId, show) {
          const div = document.querySelector('#' + divId);
          if (show) {
            div.style = "display: visible";
          } else {
            div.style = "display: none";
          }
  }
   

return service


}]);