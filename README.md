# 后台管理系统-Demo
## 项目介绍：
该管理系统主要
##功能模块：
1. 登录功能：主要实现用户登入功能，利用cookie保存密码，为接下的用户操作提供可能。
2. 个人中心：主要实现当前用户个人资料的更新与维护，以及修改密码操作。
3. 教师管理：主要实现教师的添加与修改，以及该教师账号的注销与启用功能。
4. 课程管理：只要实现课程的添加与修改，对课程进行维护。

##使用技术：require.js、LESS、jQuery、artTemplate以及一系列插件。
1. 使用LESS编写css，让代码更加具有可读性。
2. 使用require.js进行JS的模块化加载，让代码更加具有扩展性，可维护性。
3. 使用jQuery进行DOM操作，AJAX请求。
4. 使用template对页面进行渲染。
5. bootstrap
6. bootstrap-datepicker
6. nprogress
7. echarts
8. ckeditor
9. 

##使用说明：
1. 由于本项目涉及到AJAX相关操作以及配置了反向代理，你需要：
  1. 将项目加载到服务器环境中，并配置浏览域名。
  2. 反向代理详细配置说明：
  ```
    1. 开启Apache rewrite模块，将#号删除
        #LoadModule rewrite_module modules/mod_rewrite.so
    2. 设置目录权限
        搜索找到 AllowOverride 设置 AllowOverride All
    3.
  ```


2. 项目目录结构：
  1.  index.php: 项目入口文件
  2.  .htaccess: 隐藏入口文件
  3.  public文件夹：主要存放公共代码
     1. assets文件夹：所有需要的插件
     2. images文件夹：项目所需图片
     3. js文件夹：require.js 单独存放再次
     4. less文件夹：项目中用到样式文件
     5. src文件夹：模块化的JS代码
  4. uploads文件夹： 项目初始图片
  5. views：HTML页面
    

