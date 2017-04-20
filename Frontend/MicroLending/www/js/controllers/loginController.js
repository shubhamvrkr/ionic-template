mycontrollerModule.controller('loginCtrl', ['$scope', '$stateParams','$state','$ionicLoading','$timeout','fileFactory','loginFactory',"$cordovaZip",'registerFactory','$ionicPush', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$ionicLoading,$timeout,fileFactory,loginFactory,$cordovaZip,registerFactory,$ionicPush) {


	$scope.Login = function(data){
	
		console.log("Login")
		var user_name = data.username
        var password = data.password
        var login_data = {}
        
        login_data.username = data.username
        login_data.password = data.password
        
        if (window.cordova)
        {
            
            ss.get(
                     function (value) {
                        console.log('Success, got ' + value); 
                        login_data.ks = JSON.parse(value).ks;
                        console.log(login_data.ks);
                        //check for the email validation
                        
                        /*if (login_data.username != JSON.parse(value).email || login_data.username != JSON.parse(value).address )
                        {  console.log("incorrect email or address")
                           return
                        }*/
                          loginFactory.login(login_data,function(err,result){
                              if (err) {
                                  console.log(err)
                                  //console.log($scope.error)
                                  return
                                 }

                              else{
                                      console.log("Login",result)
                                      $state.go('menu.allContracts');
                                  }


                          })

                      },
                        function (error) { 
                              console.log('Error ' + error); 
                        },
                            'user_data');
                                      
        }else{

                  login_data.ks = JSON.parse(localStorage.getItem('user_data')).ks
                  console.log(login_data.ks);
                  //check for the email validation

                     loginFactory.login(login_data,function(err,result){
                           if (err) {

                                     console.log("Login error",err)
                                     
                                 }

                                 else{
                                         console.log("Login",result)
                                         $state.go('menu.allContracts');

                                    }


                             }); 
               }
 
       		
		/* $ionicLoading.show({
				templateUrl: 'templates/loading.html',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
		});
		
		$timeout(function () {
			
			$ionicLoading.hide();
			$state.go('menu.allContracts');
    
		}, 2000);*/

		
	}
	
	$scope.Export = function(){
	
			if(window.cordova){
			
				console.log("Device");
				fileChooser.open(success, error);
			
			}else{
			
				console.log("Browser")
				console.log()
				var input = document.getElementById("fileLoader");
				input.click();

			}
	
	
	}
	var success = function(data) {
	
        console.log("new Data: ",data);
		
		var permissions = cordova.plugins.permissions;
		
		console.log(permissions)

		permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionCallback, null);

        function checkPermissionCallback(status) {
			console.log("status: ",status)
            
			if (!status.hasPermission) {
                
                  permissions.requestPermission(
                  permissions.READ_EXTERNAL_STORAGE,
                  function (status) {
                      if (!status.hasPermission) {
                          errorCallback();
                      } else {
                          
						  // continue with downloading/ Accessing operation 
						  resolveNativePath();
                      }
                  },errorCallback);
            }else{
			
				resolveNativePath()
			   }
        }
       
		function resolveNativePath(){
			
			window.FilePath.resolveNativePath(data, function(filepath){
			
			 console.log("File path: ",filepath);
			 
            //create a directory micro_lending   
              fileFactory.createDirectory("micro_lending","/",function(res){
               
                 console.log("App creation",res)
                     
			 //handle unzipping here for android
               fileFactory.unZip("",filepath,function(data){
               
                     console.log("unzip status",data)
               
                    fileFactory.readFile("user_profile.json","micro_lending/user_data/",function(data){
                     
                        if (data.status=="0"){console.log("Error reading file after zipping");}
                     
							console.log(data)
                             registerFactory.saveUserDataLocally(data.data,'user_data',function(res){
                                             console.log(res);
                                              $state.go('menu.allContracts');
                                    });
                              })
                        })
               })
			 
               }, function(code,message){

                   console.log(code);
                   console.log(message);

               });
		} 
};
	
    var error = function(msg) {
        
		console.log("error: ",msg);
      
    };
	var errorCallback = function () {
		
		//user didnt grant permission
		//tell him export couldnot be done
         console.warn('Storage permission is not turned on');
    }
	$scope.fileNameChanged = function(element){
		
       
         //browser
        fileFactory.unZip("",element.files[0],function(data){
               console.log(data)
            //save the data in the localStorage
           registerFactory.saveUserDataLocally(data.data,'user_data',function(res){
                           console.log("saved in local Storage",res);
              console.log(JSON.parse(localStorage.getItem("user_data")))
                            $state.go('menu.allContracts');
                          
            });  
               
      })
   }

}]);