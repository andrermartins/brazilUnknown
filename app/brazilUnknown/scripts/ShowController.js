angular
  .module('brazilUnknown')
  .controller('ShowController', function ($scope, Article, supersonic) {
	$scope.showSpinner = true;
	$scope.dataUrl = undefined;
	$scope.htmlArticle = '';

	var _refreshViewData = function () {
		if ( $scope.dataUrl ) {
			$scope.htmlArticle = '<iframe src="'+$scope.dataUrl+'" width="100%" height="1000"></iframe>';
			$scope.showSpinner = false;
		}
	}

	supersonic.ui.views.current.whenVisible( function () {
		_refreshViewData();
	});

	supersonic.ui.views.current.params.onValue( function (values) {
		$scope.dataUrl = values.url;
		$scope.title = values.title;
		_refreshViewData();
	});
  });