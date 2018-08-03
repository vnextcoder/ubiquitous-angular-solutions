mainApp.controller('studentController', function($scope){
        
    $scope.student={
        firstname:"avinash",
        lastname:"barnwal",
        fees:193,
        fullname:function() {
            var studentObject;
            studentObject=$scope.student;
            return studentObject.firstname + " " + studentObject.lastname;
        },
        subjects: [
            {name:"maths", marks:80},
            {name:"physics",marks:95},
            {name:"english",marks:50},
            {name:"hindi",marks:60}
        ]
    }
});