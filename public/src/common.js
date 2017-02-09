define(['jquery', 'template', 'cookie'], function($, template) {
	// 判断页面是否登入
	// 地址栏pathname 不是login  并且 没有cookie 则跳转 登入页面
	if(location.pathname != '/login' && !$.cookie('PHPSESSID')) {
		location.href = '/login';
	}

	// 退出登入
	$('#logout').on('click', function() {
		$.ajax({
			// 反向代理
			url: '/api/logout',
			type: 'post',
			success: function(info) {
				if(info.code == 200) {
					alert(info.msg);
					// 刷新页面
					location.reload();
				}
			}
		});
	});

	// 侧边栏 头像
	var loginfo = $.cookie('loginfo');
	// 转换成对象
	var loginfo = loginfo && JSON.parse(loginfo);
	// 模板
	var tmp = '<div class="avatar img-circle">\
            		<img src="{{tc_avatar}}">\
        	   </div>\
        	   <h4>{{tc_name}}</h4>';
    // 调用模板引擎
    var render = template.compile(tmp);
    // 渲染
    var html = render(loginfo || {});
    // 添加到页面中
    $('.aside .profile').html(html);

    // 侧栏导航交互
    $('.navs ul').prev('a').on('click', function() {
    	$(this).next().slideToggle();
    });



});