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

// Home Controller
.controller('HomeCtrl', function($scope, data, $state, $http) {

  $scope.user = data;

  $scope.submitEmail = function() {
    if (this.email) {
      $scope.user.email = this.email;
      console.log($scope.user);
      $state.go('^.' + 'quiz1');
    }
  };

})

// Quiz Controller
.controller('QuizCtrl', function($scope, data, results, $state, $http) {

  // List of the quiz questions
  $scope.quizList = [
    { text: 'Les Amis', checked: false },
    { text: 'The Continental Club', checked: false },
    { text: 'GM Steakhouse', checked: false },
    { text: 'Quack\'s on the Drag', checked: false },
  ];
  $scope.user = data;
  $scope.results = results;

  // Array for keeping track of current answer
  $scope.selection = [];

  // Keeps track of current answer
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

  function recordAnswer() {
    if ($scope.selection.length > 0) {
      $scope.results.correct++;
    }

    $scope.results.questions++;
    $scope.selection = [];
  }

  $scope.goQuiz2 = function() {
    recordAnswer();
    $scope.quizList[0].checked = false;
    $state.go('^.' + 'quiz2');
  };

  $scope.goQuiz3 = function() {
    recordAnswer();
    $scope.quizList[1].checked = false;
    console.log($scope.user);
    $state.go('^.' + 'quiz3');
  };

  $scope.goQuiz4 = function() {
    recordAnswer();
    $scope.quizList[2].checked = false;
    console.log($scope.user);
    $state.go('^.' + 'quiz4');
  };

  $scope.submitQuiz = function() {
    recordAnswer();
    $scope.quizList[3].checked = false;
    $scope.user.score = $scope.results.correct / $scope.results.questions * 100;
    console.log($scope.user);
    $http.post('https://slacker-server.herokuapp.com/', $scope.user)
      .then(function() {
        console.log('SUCCESS: successful post submission');
      }, function() {
        console.log('ERROR: unsuccessful post submission');
      });
    $state.go('^.' + 'results');
  };

})

// Results Controller
.controller('ResultsCtrl', function($scope, data, results, $state, $http) {

  $scope.user = data;
  $scope.results = results;
  $scope.submitRestart = function() {
    $scope.user.email = null;
    $scope.user.score = null;
    $scope.results.questions = 0;
    $scope.results.correct = 0;
    $state.go('^.' + 'home');
  };

})

// Application routes
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home.html',
  });

  $stateProvider.state('quiz1', {
    url: '/quiz1',
    templateUrl: 'views/quiz1.html',
  });

  $stateProvider.state('quiz2', {
    url: '/quiz2',
    templateUrl: 'views/quiz2.html',
  });

  $stateProvider.state('quiz3', {
    url: '/quiz3',
    templateUrl: 'views/quiz3.html',
  });

  $stateProvider.state('quiz4', {
    url: '/quiz4',
    templateUrl: 'views/quiz4.html',
  });

  $stateProvider.state('results', {
    url: '/results',
    templateUrl: 'views/results.html',
  });
})

.factory('data', function() {
  return {
    email: null,
    score: null,
  };
})

.factory('results', function() {
  return {
    questions: 0,
    correct: 0,
  };
});
