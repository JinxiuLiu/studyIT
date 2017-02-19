
define(['jquery', '../utils', 'template', 'validate', 'form'], function ($, utils, template) {
	// 设置导航
	utils.setMenu('/course/create');

	// 根据课程id获取课程信息
	var cs_id = utils.qs('cs_id'),
		chapter = $('#chapter'),
		chapterModal = $('#chapterModal'),
		html;

	// 发送请求，向服务器索要数据
	$.ajax({
		// http://api.botue.com/course/lesson
		url: '/api/course/lesson',
		type: 'get',
		data: {cs_id: cs_id},
		success: function (info) {
			console.log(info);
			if(info.code == 200) {
				// 调用模板引擎
				html = template('chapterTpl', info.result);

				// 添加DOM
				chapter.html(html);
			}
		}
	});

	// 添加课时
	chapter.on('click', '.add', function () {

		// 调用模板引擎
		html = template('lessonTpl', {
			title: '添加课时',
			btnText: '添 加',
			// http://api.botue.com/course/chapter/add
			action: '/api/course/chapter/add'
		});

		// 添加DOM
		chapterModal.find('.modal-content').html(html);

		// 调用模态框
		chapterModal.modal();

		// 表单验证
		validForm();
	});

	// 编辑课时
	chapter.on('click', '.edit', function () {
		var _this = $(this),
			parent = _this.parent(),
			ct_id = parent.attr('data-id');

		// 发送一个请求向服务器索要数据
		$.ajax({
			// http://api.botue.com/course/chapter/edit
			url: '/api/course/chapter/edit',
			type: 'get',
			data: {ct_id: ct_id},
			success: function (info) {

				if(info.code == 200) {

					info.result.title = '编辑课时';
					info.result.btnText = '修 改';
					// http://api.botue.com/course/chapter/modify
					info.result.action = '/api/course/chapter/modify';

					// 调用模板引擎
					html = template('lessonTpl', info.result);

					// 添加DOM
					chapterModal.find('.modal-content').html(html);

					// 调用模态框
					chapterModal.modal();

					// 表单验证
					validForm();
				}
			}
		});
	});

	// 验证并提交表单
	function validForm() {
		$('#lessonForm').validate({
			sendForm: false,
			valid: function () {
				// 判断是否免费
				var is_free = $('.free')[0].checked ? 1 : 0;

				// 提交表单
				$(this).ajaxSubmit({
					// 当不添写url属性，默认会查找
					// 当前表单的action
					type: 'post',
					// 课时要属于某一个课程
					// 所以要将课程id传到服务端
					data: {ct_cs_id: cs_id, ct_is_free: is_free},
					success: function (info) {
						console.log(info);
						if(info.code == 200) {
							chapterModal.modal('hide');
						}
					}
				});
			}
		});
	}
});