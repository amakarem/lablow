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

}]);