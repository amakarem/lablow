//"use strict";

var courseApp = angular.module('courseApp', ['angular-scroll-animate', 'ui.bootstrap', 'duScroll', 'ngAnimate', 'ngSanitize' ]);
var endInSight = false;

courseApp.config(['$compileProvider',
  function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
  }]);

/*$compileProvider.html5Mode({
    //enabled: true,
    //requireBase: false
});*/


courseApp.controller(
  'BaseController',
  [
    '$scope',
    '$location',
    '$timeout',
    '$window',
    function ($scope, $location, $timeout, $window) {
      $scope.showMenu = false;
      $scope.showResources = false;
      $scope.params = $location.search();
      $scope.editContent = false;
      $scope.fileToDownload = null;
      $scope.currentTermEditing = null;
      $scope.scrollOffset = 115;
      $scope.scrollOffset_ans =  $(window).height() - 180;

        $(window).resize(function() {
            $scope.scrollOffset_ans =  $(window).height() - 180;
        });


      if ($('button.navbar-toggle').is(":visible")) {
        $scope.scrollOffset = 75;
      }
      $scope.popoverTrigger = 'outsideClick';


      if (_.isObject($scope.params)) {
        $scope.editContent = ($scope.params.auth === 'editmode');
        if ($scope.editContent) {
          $scope.popoverTrigger = 'none';
        }
      }

      $scope.openTermEditor = function (termNumber, isCircleTerm) {
        if (!$scope.editContent) {
          return false;
        }

        //$scope.popoverContent = $scope.trustAsHtml('Line 1<br>Line2');

        $('.popover').popover('destroy');
        $scope.currentTermEditing = termNumber;
        var term = $('#' + termNumber);
        var editableTerm = $('#editTerms');
        var termInput = editableTerm.find('input[type=text]');
        termInput.val(term.attr('popover-title'))
          .removeClass('circle-term');
        if (isCircleTerm) {
          termInput.addClass('circle-term');
        }
        if (term.attr('uib-popover-html')) {
            editableTerm.find('div').html(term.attr('uib-popover-html'));
        }
        if (term.attr('uib-popover')) {
            editableTerm.find('div').html(term.attr('uib-popover'));
        }
        
        $('#termEditorModal').modal('toggle');
      };

      $scope.saveTerm = function () {
        if (!$scope.currentTermEditing) {
          console.error('Cannot save term without current term global.');
        }

        var term = $('#' + $scope.currentTermEditing);
        var editableTerm = $('#editTerms');
        var termInput = editableTerm.find('input[type=text]');
        var termTitle = termInput.val();

        term.attr('popover-title', termTitle);
        
        if (term.attr('uib-popover-html')) {
            term.attr('uib-popover-html', editableTerm.find('div').html());
        }
        
        if (term.attr('uib-popover')) {
            term.attr('uib-popover', editableTerm.find('div').html());
        }
        
        if (!termInput.hasClass('circle-term')) {
          term.html(termTitle);
        }

        $('#termEditorModal').modal('hide');
        $scope.currentTermEditing = null;
      };

      $scope.downloadFile = function () {
        var output = document.documentElement.outerHTML
          .replace(/&amp;&amp;/ig, "&&")
          .replace(/popover-trigger="none"/ig, 'popover-trigger="{{ popoverTrigger }}"')
          .replace(/ contenteditable="true"/ig, '');
        $scope.fileToDownload = window.URL.createObjectURL(
          new Blob(["<!DOCTYPE html>" + output], {type: 'text/html'})
        );
      };

      $scope.animateFlipIn = function ($el) {
        _processAnimation($el, 'flipInX');
      };

      $scope.animateFadeIn = function ($el) {
        _processAnimation($el, 'fadeIn');
      };

      $scope.animateFadeInRight = function ($el) {
        _processAnimation($el, 'fadeInRight');
      };

      $scope.animateFadeInRightEND = function ($el) {
		  if (!endInSight) { 
			if (typeof(parent.strContentLocation)!="undefined") {
				parent.SetReachedEnd();
			}
			endInSight=true;
			}
        _processAnimation($el, 'fadeInRight');
      };

      $scope.animateFadeInLeft = function ($el) {
        _processAnimation($el, 'fadeInLeft');
      };

      _processAnimation = function ($el, animation, action) {
        if (_.isNull(animation) || _.isUndefined(animation)) {
          animation = 'fadeIn';
        }

        switch (action) {
          case 'out':
            $el.addClass('hide-me');
            $el.removeClass('animated ' + animation);
            break;
          default:
            $el.removeClass('hide-me');
            $el.addClass('animated ' + animation);
            break;
        }
      };

      cleanUp = function (a) {
        $scope.fileToDownload = null;
        // Need a small delay for the revokeObjectURL to work properly.
        $timeout(function () {
          $window.URL.revokeObjectURL(a.href);
        }, 1500);
      };
    }
  ]
);
courseApp.controller('MultipleChoiceController', ['$scope', function ($scope) {
  $scope.questionsData = [
    {
      options: [
        {selected: false, correct: false},
        {selected: false, correct: true},
        {selected: false, correct: false},
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
        {selected: false, correct: false},
        {selected: false, correct: false},
        {selected: false, correct: false},
        {selected: false, correct: true}
      ],
      attempts: 0,
      showFinishedResult: false,
      showTryAgainResult: false,
      showCorrectResult: false,
      showIncorrectResult: false
    },
    {
      options: [
            {selected: false, correct: false},
            {selected: false, correct: true},
            {selected: false, correct: false},
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
          {selected: false, correct: false},
          {selected: false, correct: false},
          {selected: false, correct: false},
          {selected: false, correct: true}
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
    },
      {
        options: [
            {selected: false, correct: false},
            {selected: false, correct: false},
            {selected: false, correct: false},
            {selected: false, correct: true}
        ],
        attempts: 0,
        showFinishedResult: false,
        showTryAgainResult: false,
        showCorrectResult: false,
        showIncorrectResult: false
      },
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
      },
      {
        options: [
          {selected: false, correct: false},
          {selected: false, correct: false},
          {selected: false, correct: false},
          {selected: false, correct: true}
        ],
        attempts: 0,
        showFinishedResult: false,
        showTryAgainResult: false,
        showCorrectResult: false,
        showIncorrectResult: false
      },
      {
        options: [
            {selected: false, correct: false},
            {selected: false, correct: true},
            {selected: false, correct: false},
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
      },
      {
          options: [
              {selected: false, correct: false},
              {selected: false, correct: true},
              {selected: false, correct: false},
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
              {selected: false, correct: false},
              {selected: false, correct: false},
              {selected: false, correct: false},
              {selected: false, correct: true}
          ],
          attempts: 0,
          showFinishedResult: false,
          showTryAgainResult: false,
          showCorrectResult: false,
          showIncorrectResult: false
      },
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
              {selected: false, correct: false},
              {selected: false, correct: false},
              {selected: false, correct: false},
              {selected: false, correct: true}
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

    if (isCorrect === true && $scope.questionsData[question].attempts < 2) {
      $scope.questionsData[question].attempts = 2;
      $scope.questionsData[question].showFinishedResult = true;
      $scope.questionsData[question].showTryAgainResult = false;
    }

    angular.element('#mc_' + (question + 1) + ' .mc-question-answer-area > div').addClass('animated bounceInUp');
    angular.element('#mc_' + (question + 1) + ' .mc-question-answer-area > div').scrollTop(500);


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
courseApp.controller('NavbarController', ['$scope', function($scope, $document) {
  $scope.navMenuClick = null;

  $scope.clickSubMenu = function (subMenuId) {
    if ($scope.navMenuClick == subMenuId) {
      $scope.clearMenus();
      return;
    }
    $scope.navMenuClick = subMenuId;
  };

  $scope.clickResources = function () {
    $scope.clearMenus();
  };

  $scope.clearMenus = function () {
    $scope.navMenuClick = null;
    $scope.showMobileMenu = null;
  };

    $scope.conditionalClearMenus = function () {
		var width = window.innerWidth || document.body.clientWidth;
		if (width > 768) {
			$scope.navMenuClick = null;
			$scope.showMobileMenu = null;
		}
  };

}]);

courseApp.controller('PopoverDemoCtrl', function ($scope, $sce) {
    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'myPopoverTemplate.html',
        title: 'Title'
    };

    $scope.neurologicPopover = {
        templateUrl: 'neurologic.html',
        title: 'Did You Know'
    };
    $scope.neurologicPopover.content = $sce.trustAsHtml('<p>Examples of CNS depressants include:</p>\n' +
        '<li class="li-format"><span class="default-gray">Sedative-' +
        '<span class="glossary" id="term_100" ng-click=openTermEditor("term_100", true)  class="circle-popover"\n' +
        '   tabindex="0" popover-trigger="{{ popoverTrigger }}" popover-title="Hypnotics" data-style="icon-pop"\n' +
        '   uib-popover="Pertaining to or causing sleep.">hypnotics\n' +
        '</span>' +
        ' </span></li>\n' +
        '            <li class="li-format"><span class="default-gray">Tricyclic antidepressants antipsychotics </span></li>\n' +
        '            <li class="li-format"><span class="default-gray">Antihistamines </span></li>\n' +
        '            <li class="li-format"><span class="default-gray">Benzodiazepines </span></li>\n' +
        '            <li class="li-format"><span class="default-gray">Centrally-active ' +
        '<span class="glossary" id="term_100" ng-click=openTermEditor("term_100", true)  class="circle-popover"\n' +
        '   tabindex="0" popover-trigger="{{ popoverTrigger }}" popover-title="Anti-emetics" data-style="icon-pop"\n' +
        '   uib-popover="Pertaining to or causing sleep.">anti-emetics\n' +
        '</span>' +
        ' </span></li>\n' +
        '            <li class="li-format"><span class="default-gray">Alcohol </span></li>');


    $scope.adverseReactionPopover = {
        templateUrl: 'adverseReaction.html',
        title: 'Here is the Connection'
    };
    $scope.adverseReactionPopover.content = $sce.trustAsHtml('<p>If any of the following adverse drug reaction (ADR) \n' +
        'occurs, patients should report to Health Canada:</p>\n' +
        '<li class="li-format"><span class="default-gray">Online at MedEffect;</span></li>\n' +
        '<li class="li-format"><span class="default-gray">By telephone: 1-866-234-2345;</span></li>\n' +
        '<li class="li-format"><span class="default-gray">By mail or fax:\n' +
        '<ul class="inner"><li>- Fax to 1-866-678-6789</li>\n' +
        '<li>- Mail to Canada Vigilance Program</li></ul></span></li>\n' +
        '<p>If you become aware of an ADR related to BuTrans, report to ProductInfo@purdue.ca or 1-800-387-4501 within ' +
        '48 hours with the following information:</p>\n' +
        '<li class="li-format"><span class="default-gray">patient initials, date of birth, age, gender</span></li>\n' +
        '<li class="li-format"><span class="default-gray">product</span></li>\n' +
        '<li class="li-format"><span class="default-gray">a description of the suspected ADR(s)</span></li>\n' +
        '<li class="li-format"><span class="default-gray">the name and contact information of the person you ' +
        'received this information from</span></li>\n' +
        '<li class="li-format"><span class="default-gray">whether or not the individual (Reporter) providing ' +
        'this information agrees to be contacted for follow-up</span></li>\n' +
        '<li class="li-format"><span class="default-gray">the date the information was received by you</span></li>');


    $scope.drugInteractionPopover = {
        templateUrl: 'drugInteraction.html',
        title: 'Did You Know'
    };

    $scope.cMaxPopover = {
        templateUrl: 'cMax.html'
    };
    $scope.cMaxPopover.title = $sce.trustAsHtml(' C<sub>max</sub> ');
    $scope.cMaxPopover.content = $sce.trustAsHtml('The maximum concentration of drug obtained in the plasma. ');



    $scope.placement = {
        options: [
            'top',
            'top-left',
            'top-right',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom'
        ],
        selected: 'top'
    };

    $scope.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');
});
