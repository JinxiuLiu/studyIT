define(['jquery', '../utils', 'template', 'uploadify', 'jcrop'], function ($, utils, template) {
	// 设置导航
	utils.setMenu('/course/create');
	// 全局DOM
	var cs_id = utils.getID('cs_id'),
		picture = $('#picture'),
		preview,
		html;
	// ajax 请求
	$.ajax({
		url: '/api/course/picture',
		type: 'get',
		data: {cs_id: cs_id},
		success: function(info) {
			if(info.code == 200) {
				// 调用模板引擎
				html = template('pictureTpl', info.result);
				// 渲染页面
				picture.html(html);

				preview = $('.preview img');

				// 裁剪图片
				function imgCrop() {
					preview.Jcrop({
						boxWidth: 400,
						aspectRatio: 2
					}, function() {
						var w = this.ui.stage.width,
							h = w / 2,
							x = 0,
							y = (this.ui.stage.height - h) / 2;
						//新选区	
						this.newSelection();
						this.setSelect([x, y, w, h]);
					});
				}

				// 裁剪按钮
				$('#cartBtn .btn').on('click', function() {
					var _this = $(this),
						status = _this.attr('data-status');

					if( status == 'save') {

					} else {
						$(this).attr('data-status', 'save')
						.val('保存图片');

						// 调用裁剪
						imgCrop();
					}
				});

				// 上传图片
				$('#upfile').uploadify({
					buttonText: '选择图片',
					buttonClass: 'btn btn-success btn-sm',
					itemTemplate: '<span></span>',
					width: 80,
					height: 'auto',
					// 限制上传图片大小
					fileSizeLimit: '2MB',
					// 限制图片格式
					fileTypeExts: '*.gif; *.jpg; *.png',
					// 请求参数
					formData: {cs_id: cs_id},
					// 服务端接收图片的参数
					fileObjName: 'cs_cover_original',
					// 上传地址
					uploader: '/api/uploader/cover',
					// 使用flash
					swf: '/public/assets/uploadify/uploadify.swf',
					onUploadSuccess: function(file, data) {
						//转成js对象
						data = JSON.parse(data); 

						if(data.code == 200) {
							// 预览图片
							preview.attr('src', data.result.path);

							// 调用裁剪
							imgCrop();

							// 更改按钮状态
							$('#cutBtn .btn')
							// 添加或删除一个属性
							// true 表示添加
							// false 表示删除
							.prop('disabled', false)
							.attr('data-status', 'save')
							.val('保存图片');
						}
					}
				})
			}
		}

	});
});