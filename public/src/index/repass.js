define(['jquery', 'validate', 'form'], function($) {

	$('#repassForm').validate({
		sendForm: false,
		valid: function() {
			$(this).ajaxSubmit({
				url: '/api/teacher/repass',
				type: 'post',
				success: function(info) {
					if(info.code == 200) {
						alert('修改成功!');
					}
				}
			});
		}
	});
});