define(['jquery'], function() {
	return {
		setMenu: function(href) {
			$('.aside a[href="' + href + '"]')
			.addClass('active')
			.parents('ul').show();
		}
	}
});