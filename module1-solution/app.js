(function(){
    angular.module("LunchCheck",[])
        .controller("LunchCheckController", LunchCheckController)
        .filter("cleanarray", cleanarrayFilter);
    
    LunchCheckController.$inject = ['$scope','cleanarrayFilter'];
    
    function LunchCheckController($scope,cleanarrayFilter){
        $scope.lunchmenu="";
        $scope.resultRed=false;
        $scope.resultGreen=false;
        $scope.checkiftoomuch=function(){
            $scope.result="";
            var lmenu=$scope.lunchmenu  ;
            var message="";
            var messageType="green";
            
            if (lmenu==="")
            {
                message="Enter your data first";
                messageType="red";
            }
            else{
                var menuarray=lmenu.split(',');
                
                var outputArray=cleanarrayFilter(menuarray);
                if (outputArray.length > 3)
                {
                    message="Too Much";
                    messageType="red";
                }
                else 
                {
                    message="Enjoy !! ";
                }
            }
            $scope.resultRed=(messageType==="red");
            $scope.resultGreen=(messageType==="green");
            $scope.result=message;
        };
    }
    function cleanarrayFilter(){
        return function(input){
            var output=new Array();
            var inputArray=input;
            for(var i=0; i<inputArray.length; i++)
                if (inputArray[i].length>0)
                    output.push(inputArray[i]);
           
            return output;
        }
    }
    
  
    
  
  })();
