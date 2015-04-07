(function($) {
	$(function () {
		$('.sign-in-bg').click(function() {
			$('.sign-in-bg').hide();
			$('.sign-in-box').hide();
		});

		$('.nav-sign-in').click(function(event) {
			$('.sign-in-bg').show();
			$('.sign-in-box').show();
		});

	});
})(jQuery);