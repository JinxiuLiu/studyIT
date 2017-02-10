define(['jquery', '../utlis', 'template'], function($, utlis, template) {
	// 设置导航
	utlis.setMenu('/teacher/list');

	// 全局DOM
	var teacherList = $('#teacherList'),
		teacherModal = $('#teacherModal'),
		html;

	// 讲师列表请求
	$.ajax({
		url: '/api/teacher',
		type: 'get',
		success: function(info) {
			if(info.code == 200) {
				// 调用模板引擎
				html = template('teacherTpl', {list: info.result});
				// 添加DOM
				teacherList.html(html);
			}
		}
	});

	// 处理模态框 查看讲师
	teacherList.on('click', '.preview', function() {
		var _this = $(this),
			td = _this.parent(),
			tc_id = td.attr('data-id');

		$.ajax({
			url: '/api/teacher/view',
			type: 'get',
			data: {tc_id: tc_id},
			success: function(info) {
				if(info.code == 200) {
					// 处理籍贯格式
					var hometown = info.result.tc_hometown
					// 去掉 | 添加 空格
					info.result.tc_hometown = hometown.split('|').join(' ');

					// 调用模板函数
					html = template('modalTpl', info.result);
					// 添加DOM
					teacherModal.find('.panel-body').html(html);
					// 显示模态框
					teacherModal.modal();
				}
			}
		});
	});

});