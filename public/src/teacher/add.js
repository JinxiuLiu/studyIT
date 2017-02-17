define(['jquery', '../utils', 'template', 'form', 'datepicker', 'language'], function($, utils, template) {
	// 设置导航
    utils.setMenu('/teacher/list');
    // 公共DOM
    var tc_id = utils.getID('tc_id'),
        teacher = $('#teacher'),
        html;

    if (tc_id) { // 编辑
        $.ajax({
            url: '/api/teacher/edit',
            type: 'get',
            data: { tc_id: tc_id },
            success: function(info) {
                if (info.code == 200) {
                	info.result.active = '讲师编辑',
                	// 按钮文字
                	info.result.btnText = '修 改',

                	info.result.action = '/api/teacher/update',

                    html = template('teacherTpl', info.result);
                    // 添加到页面中
                    teacher.html(html);
                }
            }
        });
    } else {	// 添加
    	html = template('teacherTpl', {
    		active: '讲师添加',
    		btnText: '添 加',
    		action: '/api/teacher/add',
    		tc_gender: 0
    	});
    	// 添加到页面中
    	teacher.html(html);
    }

    //提交表单
    teacher.on('submit', 'form', function () {
    	$(this).ajaxSubmit({
    		type: 'post',
    		success: function (info) {
    			if(info.code == 200) {
    				if(tc_id) {
    					alert('修改成功!');
    				} else {
    					alert('添加成功!');
    				}
    				location.href = '/teacher/list';
    			}
    		}
    	});
    	// 阻止默认提交
    	return false;
    });
});
