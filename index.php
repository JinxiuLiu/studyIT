<?php 

	// 获取用户地址信息
	// PATH_INFO 可以获取地址参数
	$pathinfo = $_SERVER['PATH_INFO'];

	if($pathinfo) {
		// explode 用来将字符串拆分成数组 类似JS split()
		// substr 用来截取字符串 类似JS中substr()
		$pathinfo = explode('/', substr($pathinfo, 1));

		// count php 系统函数 用于计算数组长度
		if(count($pathinfo) == 1) {
			$path = 'index/' . $pathinfo[0];
		} else {
			$path = $pathinfo[0] . '/' . $pathinfo[1];
		}
	} else {
		// 首页
		$path = 'index/index';
	}

	// 拼凑真实路径
	include('./views/' . $path . '.html');



