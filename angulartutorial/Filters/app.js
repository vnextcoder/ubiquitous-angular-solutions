(function () {
'use strict';

  angular.module ('myPayrollApp', [])
  .controller('myDataController', myDataController)
  .filter('computetakehome', ComputeTakeHomeFilter);


  myDataController.$inject = ['$scope','$filter','computetakehomeFilter'];
  function myDataController ($scope, $filter,ComputeTakeHomeFilter)
  {
    $scope.name="suresh  ahuja";
    $scope.age="20";
    $scope.salary=1250;
    $scope.taxpercent=0.2;
    $scope.takehome = $filter('currency')(ComputeTakeHomeFilter($scope.salary,$scope.taxpercent),'NOK',3);
    
    $scope.computetax = function(){  
      $scope.takehome = $filter('currency')(ComputeTakeHomeFilter($scope.salary, $scope.taxpercent),'NOK',3);

    }
    $scope.$watch(function(){
      console.log("fired");

    })
  }

  function ComputeTakeHomeFilter (){
    return function(input, tax){
      var salary=input;
      return salary * (1-tax);
    }
  }

  


})();

