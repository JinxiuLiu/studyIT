define(['jquery', '../utils', 'form', 'validate'], function($, utils) {
    // 设置导航
    utils.setMenu('/course/create');

    // 验证并提交数据
    $('#createForm').validate({
        sendForm: false,
        valid: function() {
        	// 表单提交
        	$(this).ajaxSubmit({
        		url: '/api/course/create',
        		type: 'post',
        		success: function(info) {
        			if(info.code == 200) {
        				location.href = '/course/basic?cs_id=' + info.result.cs_id;
        			}
        		}
        	});
        }
    })
});
