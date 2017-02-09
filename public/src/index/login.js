define(['jquery', 'cookie'], function($) {

	$('#loginForm').on('submit', function() {
		// serialize 可以获取到form中的name数据
		var formData = $(this).serialize();
		// 发送请求
		$.ajax({
			// 反向代理： http://api.botue.com/login
			url: '/api/login',
			type: 'post',
			data: formData,
			success: function(info) {
				if(info.code == 200) {
					alert(info.msg);

					// cookie  只能为字符串，将json数据转换成字符串
					$.cookie('loginfo', JSON.stringify(info.result));

					// 登入成功 跳转首页
					location.href = '/';
				}
			}
		});

		// 阻止默认提交
		return false;
	});
});