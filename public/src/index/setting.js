define(['jquery', 'template', 'ckeditor', 'form', 'validate', 'datepicker', 'language', 'region', 'ckeditor', 'uploadify'], function ($, template, CKEDITOR) {
	// 全局DOM
	var settings = $('#settings'),
		html;

	$.ajax({
		// 反向代理
		url: '/api/teacher/profile',
		type: 'post',
		success: function (info) {
			if(info.code == 200) {
				// 调用模板引擎
				html = template('settingTpl', info.result);
				// 添加到页面
				settings.html(html);
				// 省市县
				$('.hometown').region({
					url: '/public/assets/jquery-region/region.json'
				});

				// 富文本编辑器
				CKEDITOR.replace('ckeditor', {
					// 配置工具栏
					toolbarGroups: [
						{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
						{ name: 'links' },
						{ name: 'insert' },
						{ name: 'forms' },
						{ name: 'tools' },
						{ name: 'others' }
					]
				});

				// 调用表单验证
				$('form').validate({
					onblur: true,
					sendForm: false,
					// 表单验证通过后执行
					valid: function () {
						// 刷新富文本
						for(instance in CKEDITOR.instances) {
							CKEDITOR.instances[instance].updateElement();
						}

						// 提交
						$(this).ajaxSubmit({
							url: '/api/teacher/modify',
							type: 'post',
							success: function (info) {
								if(info.code == 200) {
									alert('保存成功！');
								}
							}
						});
					},
					eachValidField: function () {
						/*为合法的表单项提示信息*/
					},
					eachInvalidField: function () {
						/*为不合法的表单项提示信息*/
					},
					description: {
						// 进行文字提示
					}
				});

				// 头像上传
				$('#upfile').uploadify({
					buttonText: '',
					height: 120,
					width: 120,
					fileObjName: 'tc_avatar',
					itemTemplate: '<span><span>',
					// 上传地址
					uploader: '/api/uploader/avatar',
					swf: '/public/assets/uploadify/uploadify.swf',
					onUploadSuccess: function (file, data) {
						console.log(data);
						if(data.code == 200) {
							$('.preview img').attr('src', data.result.path);
						}
					}
				});
			}
		}
	});
});