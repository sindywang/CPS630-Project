angular.module('recipeModule',['ngMaterial', 'ngMessages'])
    .controller('AuthenticateController', ['$rootScope', '$scope', '$http', '$window', AuthenticateController]);

function AuthenticateController($rootScope,$scope,$http,$window) {
    $scope.recipeHeading="Foodgether";
    $scope.loginIsCorrect = true;
    $scope.findUser = function(username, password) {
     var user = {
       username:username,
       password:password
     }
    $http.post("http://54.86.83.49:1121/users/login", JSON.stringify(user)).then(
        function successCallback(response) {
          if (response.data.userid > 0) {
              $window.sessionStorage.setItem('activeUserId',response.data.userid);
              $window.sessionStorage.setItem('activeUserName',response.data.username);
              $window.sessionStorage.setItem('activeUser',response.data.name);
              $window.sessionStorage.setItem('activeUserCity',response.data.city);
              $window.sessionStorage.setItem('activeUserLevel',response.data.level);
              $window.location.href = './index2.html';
          }
          else {
             loginError();
          }
        },
        function errorCallback(response) {
          loginError();
        }
        );
    }

    function loginError() {
        $scope.loginIsCorrect = false;
        alert("Incorrect username or password.");
    }
}
