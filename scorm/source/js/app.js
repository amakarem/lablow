var courseApp = angular.module('courseApp', ['angular-scroll-animate', 'ui.bootstrap', 'duScroll']);

courseApp.config(['$compileProvider',
  function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
  }]);