
define(['jquery', '../utils', 'template'], function ($, utils, template) {
	// 设置导航
	utils.setMenu('/course/list');

	// 发送请求
	$.ajax({
		url: '/api/course',
		type: 'get',
		success: function (info) {
			console.log(info);
			if(info.code == 200) {
				// 调用模板引擎
				var html = template('courseTpl', {list: info.result});

				// 添加DOM
				$('#courses').append(html);
			}
		}
	});
});