# 后台管理系统-Case

## 项目介绍：
该管理系统主要实现职员管理，课程管理，广告管理，个人基本资料维护等一系列模块。

##功能模块：
1. 登录功能：主要实现用户登入功能，利用cookie保存密码，为接下的用户操作提供可能。
2. 个人中心：主要实现当前用户个人资料的更新与维护，以及修改密码操作。
3. 职员管理：主要实现职员的添加与修改，以及该职员账号的注销与启用功能。
4. 课程管理：只要实现课程的添加与修改，对课程进行维护。

##使用技术：requireJs、LESS、jQuery、artTemplate以及一系列插件。
1. 使用LESS编写css，让代码更加具有管理性、可读性。
2. 使用require.js进行JS的模块化加载，让代码更加具有扩展性，可维护性。
3. 使用原生JS和jQuery完成本系统页面各种动态效果。
4. 利用AJAX完成页面与后台的数据交互，使用template对页面进行数据渲染。
5. 利用Bootstart等框架构建网页，完成响应式布局。
6. 使用echarts完成图表信息显示。

##使用说明：
* 由于本项目涉及到AJAX相关操作以及配置了反向代理，你需要：
  - 将项目加载到服务器环境中，并配置浏览域名。
  - 反向代理详细配置说明：[详细配置见博客](http://www.sayweb.top/apache-reverse-proxy.html)

* 项目目录结构：
```
  -  index.php: 项目入口文件
  -  .htaccess: 隐藏入口文件
    +---public
  |   +---assets
  |   +---images
  |   +---js
  |   +---less
  |   \---src
  |       +---advert
  |       +---course
  |       +---index
  |       +---teacher
  |       \---user
  +---uploads
  \---views
      +---advert
      +---common
      +---course
      +---index
      +---teacher
      \---user
```

