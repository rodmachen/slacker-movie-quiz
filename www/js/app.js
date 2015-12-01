angular.module('quizApp', ['ionic'])

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

.controller('MainCtrl', function($scope, $state, $http) {

  $scope.quizList = [
    { text: 'Les Amis', checked: false },
    { text: 'The Continental Club', checked: false },
    { text: 'GM Steakhouse', checked: false },
    { text: 'Quack\'s on the Drag', checked: false },
    { text: 'Half Price Books', checked: false },
  ];

  $scope.selection = [];

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

  $scope.user = {};

  $scope.submitEmail = function() {
    if (this.email) {
      $scope.user.email = this.email;
      console.log($scope.user);
      $state.go('^.' + 'quiz');
    }
  };

  $scope.submitQuiz = function() {
    $scope.user.score = $scope.selection.length / $scope.quizList.length * 100;
    console.log($scope.user);
    $http.post('http://localhost:5000/', $scope.user)
      // TODO register successful status code
      .then(function() {
        console.log('SUCCESS: successful post submission');
      }, function() {
        console.log('ERROR: unsuccessful post submission');
      });
    $state.go('^.' + 'results');
  };

  $scope.submitRestart = function() {
    $scope.user = {};
    console.log($scope.user);
    $state.go('^.' + 'home');
  };

})

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home.html',
  });

  $stateProvider.state('quiz', {
    url: '/quiz',
    templateUrl: 'views/quiz.html',
  });

  $stateProvider.state('results', {
    url: '/results',
    templateUrl: 'views/results.html',
  });
});
