angular.module('todoApp')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/login",
      templateUrl: "src/view/login.tmpl"
    })
    .state('addcourse', {
      url: "/addcourse",
      templateUrl: "src/view/addcourse.tmpl"
    })
    .state('register', {
      url: "/register",
      templateUrl: "src/view/register.tmpl"
    })
});
