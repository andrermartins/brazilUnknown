angular
  .module('brazilUnknown')
  .controller('ArticlesController', function ($scope, Article, supersonic) {
	$scope.articles = null;
	$scope.showSpinner = true;

	Article.all().whenChanged( function (articles) {
		$scope.$apply( function () {
			articles.sort( function (a, b) {
				return b.seq - a.seq;
			});
			$scope.articles = articles;
			$scope.showSpinner = false;
		});
	});

  });