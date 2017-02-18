define(['jquery', '../utils', 'template', 'ckeditor', 'validate', 'form'], function($, utils, template, CKEDITOR) {
	// 设置导航
	utils.setMenu('/course/create');
	// 全局DOM
	var cs_id = utils.getID('cs_id'),
		basic = $('#basic'),
		html;

	$.ajax({
		url: '/api/course/basic',
		type: 'get',
		data: {cs_id: cs_id},
		success: function (info) {
			if(info.code == 200) {
					// 模板引擎
				html = template('basicTpl', info.result);
				// 渲染页面
				basic.html(html);

				// 富文本编辑框
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

				// 提交表单 验证
				$('#basicForm').validate({
					sendForm: false,
					valid: function() {
						// 刷新富文本
						for(instance in CKEDITOR.instances) {
							CKEDITOR.instances[instance].updateElement();
						}
						// 提交
						$(this).ajaxSubmit({
							url: '/api/course/update/basic',
							type: 'post',
							success: function(info) {
								if(info.code == 200) {
									location.href = '/course/picture?cs_id=' + info.result.cs_id;
								}
							}
						})
					}
				});
			}
		}
	});

	// 分类联动
	// 事件委托
	basic.on('change', 'select.top', function () {
		// 获取id
		var _this = $(this),
			cg_id = _this.val();

		$.ajax({
			url: '/api/category/child',
			type: 'get',
			data: {cg_id: cg_id},
			success: function(info) {

				var tpl = '{{each opts}}\
           			<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>\
						   {{/each}}';

				// 处理字符串模板
				var render = template.compile(tpl);

				// 渲染模板
				html = render({opts: info.result});

				// 添加页面
				_this.next().html(html);
			}
		})
	});
});

