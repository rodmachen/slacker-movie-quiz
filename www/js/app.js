// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('quizApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MainCtrl', function($scope, $state) {

  $scope.quizList = [
    { text: 'Les Amis', checked: false },
    { text: 'The Continental Club', checked: false },
    { text: 'GM Steakhouse', checked: false },
    { text: 'Quack\'s on the Drag', checked: false },
    { text: 'Half Price Books', checked: false },
  ];

  var user = {};

  $scope.submitEmail = function() {
    if (this.email) {
      user.email = this.email;
      console.log(user);
      $state.go('^.' + 'quiz');
    };
  };

  $scope.submitQuiz = function() {
    user.email = this.email;
    console.log(user);
    $state.go('^.' + 'results');
  };

})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home.html'
  });

  $stateProvider.state('quiz', {
    url: '/quiz',
    templateUrl: 'views/quiz.html'
  })
  
  $stateProvider.state('results', {
    url: '/results',
    templateUrl: 'views/results.html'
  })
})