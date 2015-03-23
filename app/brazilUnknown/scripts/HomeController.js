angular
  .module('brazilUnknown')
  .controller('HomeController', function ($scope, Article, supersonic) {
	$scope.showSpinner = true;
	$scope.htmlArticle = '';

	var _refreshViewData = function () {
		supersonic.logger.info("started");
		Article.all().whenChanged( function (articles) {
			$scope.$apply( function () {
				var lastArticle = undefined;
				for (var i = 0; i < articles.length; i++) {
					var currentArticle = articles[i];
					if (!lastArticle || lastArticle.seq < currentArticle.seq) {
						lastArticle = currentArticle;
					}
				}
				$scope.htmlArticle = '<iframe src="'+lastArticle.url+'" width="100%" height="1000"></iframe>';
				$scope.showSpinner = false;
			});
		});
	}

	supersonic.ui.views.current.whenVisible( function () {
		_refreshViewData();
	});
  });