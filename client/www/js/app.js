angular.module('quizApp', ['ionic'])

// Default Ionic code
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar
    // above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// Main Controller
.controller('MainCtrl', function($scope, data, $state, $http) {

  // List of the quiz questions
  $scope.quizList = [
    { text: 'Les Amis', checked: false },
    { text: 'The Continental Club', checked: false },
    { text: 'GM Steakhouse', checked: false },
    { text: 'Quack\'s on the Drag', checked: false },
    { text: 'Half Price Books', checked: false },
  ];

  // Array for keeping track of selected answers
  $scope.selection = [];

  // Keeps track of selected answers
  $scope.toggleSelection = function toggleSelection(question) {
    var idx = $scope.selection.indexOf(question);

    // is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
    }

    // is newly selected
    else {
      $scope.selection.push(question);
    }

  };

  // User object for storing user data
  $scope.user = data;

  // 1st View Submit Button
  // Captures email and moves to 2nd View
  $scope.submitEmail = function() {
    if (this.email) {
      $scope.user.email = this.email;
      console.log($scope.user);
      $state.go('^.' + 'quiz');
    }
  };

  // 2nd View Submit Button
  // Captures score and moves to 3rd View
  $scope.submitQuiz = function() {
    $scope.user.score = $scope.selection.length / $scope.quizList.length * 100;
    console.log($scope.user);
    $http.post('https://slacker-server.herokuapp.com/', $scope.user)
      .then(function() {
        console.log('SUCCESS: successful post submission');
      }, function() {
        console.log('ERROR: unsuccessful post submission');
      });
    $state.go('^.' + 'results');
  };

  // 3rd View Submit Button
  // Empties User object and moves back to 1st View
  $scope.submitRestart = function() {
    $scope.user = {};
    console.log($scope.user);
    $state.go('^.' + 'home');
  };

})

// Application routes
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  // 1st View
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home.html',
  });

  // 2nd View
  $stateProvider.state('quiz', {
    url: '/quiz',
    templateUrl: 'views/quiz.html',
  });

  // 3rd View
  $stateProvider.state('results', {
    url: '/results',
    templateUrl: 'views/results.html',
  });
})

.factory('data', function () {
    return {};
});
