define(['jquery', 'template', '../utils'], function($, template, utils) {
    // 设置选中导航
    utils.setMenu('/teacher/list');

    // 全局获取DOM元素
    var teacherList = $('#teacherList'),
        teacherModal = $('#teacherModal'),
        html;

    // 发送请求获取数据
    // /api http://api.botue.com
    $.ajax({
        url: '/api/teacher',
        type: 'get',
        success: function(info) {
            // 将获取到的数据放到页面中
            // console.log(info);
            // 调用模板引擎
            html = template('teacherTpl', { list: info.result });
            // 添加DOM
            teacherList.html(html);
        }
    });

    // 处理模态框
    teacherList.on('click', '.preview', function() {

        var _this = $(this),
            td = _this.parent(),
            tc_id = td.attr('data-id');

        // alert(tc_id);
        // 发请求获取某一讲师的详细信息
        // /api http://api.botue.com
        $.ajax({
            url: '/api/teacher/view',
            type: 'get',
            data: { tc_id: tc_id },
            success: function(info) {
                if (info.code == 200) {
                    // 处理家乡显示格式
                    var hometown = info.result.tc_hometown;
                    info.result.tc_hometown = hometown.split('|').join(' ');

                    // 调用模板引擎
                    html = template('modalTpl', info.result);
                    // 添加DOM
                    teacherModal.find('.panel-body').html(html);

                    // 显示模态框
                    teacherModal.modal();
                }

            }
        });
    });

    // 注销/启用讲师
    teacherList.on('click', '.handle', function() {

        var _this = $(this),
            td = _this.parent(),
            tc_id = td.attr('data-id'),
            // 讲师当前的状态
            // 0 表示启用了，对应的文字“注销”
            // 1 表示注销了，对应的文字“启用”
            tc_status = td.attr('data-status');

        // 
        $.ajax({
            url: '/api/teacher/handle',
            type: 'post',
            data: { tc_id: tc_id, tc_status: tc_status },
            success: function(info) {
                console.log(info);
                if (info.code == 200) {
                    // 假如当前是“注销”，改成“启用”
                    // 假如当前是“启用”，改成“注销”
                    if (tc_status == 0) {
                        _this.text('启 用');
                    } else {
                        _this.text('注 销');
                    }

                    // 更新讲师的状态
                    td.attr('data-status', info.result.tc_status);
                }
            }
        });

    })

});
