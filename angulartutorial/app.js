'use strict';
angular.module ('mycalc', [])

.controller('mycontroller', function($scope){

    $scope.name="";
    $scope.namevalue=20;
    $scope.showvalue = function(){
        var totnamevalue=0;
        totnamevalue=calculatenvalueforString($scope.name);
        $scope.namevalue=totnamevalue;
        console.log($scope)

    };
    function calculatenvalueforString(string )
    {
        var totvalue=0;
        for(var i=0; i< string.length; i++)
            totvalue+= string.charCodeAt(i);
        return totvalue;

    }
});


