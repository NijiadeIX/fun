(function($) {
	$(function () {
		$('.xx_sign-in-bg').click(function() {
			$('.xx_sign-in-bg').hide();
			$('.xx_sign-in-box').hide();
		});

		$('.xx_nav-sign-in').click(function(event) {
			$('.xx_sign-in-bg').show();
			$('.xx_sign-in-box').show();
		});

	});
})(jQuery);