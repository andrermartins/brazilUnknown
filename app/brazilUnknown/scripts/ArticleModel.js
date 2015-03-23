angular
  .module('brazilUnknown')
  .constant('Article', supersonic.data.model('Article'))
  .config(function($sceProvider) {
	$sceProvider.enabled(false);
  });