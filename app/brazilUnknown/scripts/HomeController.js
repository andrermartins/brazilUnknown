angular
  .module('brazilUnknown')
  .controller('HomeController', function ($scope, Article, supersonic) {
	$scope.showSpinner = true;
	$scope.dataUrl = undefined;
	$scope.htmlArticle = '';

	var _refreshViewData = function () {
		if ( $scope.dataUrl ) {
			$scope.showSpinner = false;
			supersonic.ui.layers.pop();
		}
		else {
			Article.all().whenChanged( function (articles) {
				$scope.$apply( function () {
					var lastArticle = undefined;
					for (var i = 0; i < articles.length; i++) {
						var currentArticle = articles[i];
						if (!lastArticle || lastArticle.seq < currentArticle.seq) {
							lastArticle = currentArticle;
						}
					}

					$scope.dataUrl = lastArticle.url;
					$scope.htmlArticle = '<iframe src="'+$scope.dataUrl+'" width="100%" height="1000"></iframe>';
					$scope.showSpinner = false;
				});
			});
		}
	}

	supersonic.ui.views.current.whenVisible( function () {
		_refreshViewData();
	});

	supersonic.ui.views.current.params.onValue( function (values) {
		supersonic.logger.info("ANDRE "+values.url);
		$scope.dataUrl = values.url;
		_refreshViewData();
	});
  });