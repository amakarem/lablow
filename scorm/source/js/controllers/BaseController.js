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
        editableTerm.find('textarea').text(term.attr('uib-popover'));
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

        term.attr('popover-title', termTitle)
          .attr('uib-popover', editableTerm.find('textarea').val());

        if (!termInput.hasClass('circle-term')) {
          term.text(termTitle);
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