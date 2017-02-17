define(['jquery'], function() {
	return {
		setMenu: function(href) {
			$('.aside a[href="' + href + '"]')
			.addClass('active')
			.parents('ul').show();
		},
		getID: function (key) {
			// 
			var search = location.search.slice(1);
			// & 分割
			search = search.split('&');

			var obj = {};
			// 遍历search
			for(var i = 0; i < search.length; i++) {
				var temp = search[i].split('=');
				// 存储成对象
				obj[temp[0]] = temp[1];
			}
			// 传入什么返回那个对象
			return obj[key];
		}
	}
});