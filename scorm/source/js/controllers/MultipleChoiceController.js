courseApp.controller('MultipleChoiceController', ['$scope', function ($scope) {
  $scope.questionsData = [
    {
      options: [
        {selected: false, correct: false},
        {selected: false, correct: false},
        {selected: false, correct: true},
        {selected: false, correct: false}
      ],
      attempts: 0,
      showFinishedResult: false,
      showTryAgainResult: false,
      showCorrectResult: false,
      showIncorrectResult: false
    },
    {
      options: [
        {selected: false, correct: true},
        {selected: false, correct: false},
        {selected: false, correct: false},
        {selected: false, correct: false}
      ],
      attempts: 0,
      showFinishedResult: false,
      showTryAgainResult: false,
      showCorrectResult: false,
      showIncorrectResult: false
    }
  ];

  $scope.selectOption = function (question, option) {
    $scope._resetSelectedOptions(question);
    $scope.questionsData[question].options[option].selected = true;
  };

  $scope.submitOptions = function (question) {
    $scope.questionsData[question].attempts++;
    var isCorrect = true;
    _($scope.questionsData[question].options).forEach(function (value) {
      if (value.selected != value.correct) {
        isCorrect = false;
        return isCorrect;
      }
    });

    $scope.questionsData[question].showCorrectResult = isCorrect;
    $scope.questionsData[question].showIncorrectResult = !isCorrect;

    $scope.questionsData[question].showTryAgainResult = true;
    if ($scope.questionsData[question].attempts === 2 || $scope.questionsData[question].showCorrectResult) {
      $scope.questionsData[question].showFinishedResult = true;
      $scope.questionsData[question].showTryAgainResult = false;
    }

    angular.element('#mc_' + (question + 1) + ' .mc-question-answer-area > div').addClass('animated bounceInUp');

    if (isCorrect === true && $scope.questionsData[question].attempts < 2) {
      $scope.questionsData[question].attempts = 2;
    }
  };

  $scope.resetOptions = function (question) {
    $scope._resetSelectedOptions(question);
    $scope.questionsData[question].attempts = 0;
    $scope.questionsData[question].showFinishedResult = false;
    $scope.questionsData[question].showTryAgainResult = false;
    $scope.questionsData[question].showCorrectResult = false;
    $scope.questionsData[question].showIncorrectResult = false;
    angular.element('#mc_' + (question + 1) + ' .mc-question-answer-area > div').removeClass('animated bounceInUp');
  };

  $scope._resetSelectedOptions = function (question) {
    _.map($scope.questionsData[question].options, function (option) {
      option.selected = false;
    });
  }
}]);