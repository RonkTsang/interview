- [CSRF（Cross-site request forgery，跨站请求伪造）](#csrf%EF%BC%88cross-site-request-forgery%EF%BC%8C%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0%EF%BC%89)
- [XSS（Cross Site Scripting，跨站脚本攻击）](#xss%EF%BC%88cross-site-scripting%EF%BC%8C%E8%B7%A8%E7%AB%99%E8%84%9A%E6%9C%AC%E6%94%BB%E5%87%BB%EF%BC%89)
- [摘自：](#%E6%91%98%E8%87%AA%EF%BC%9A)

# CSRF（Cross-site request forgery，跨站请求伪造）

CSRF(XSRF) 顾名思义，是伪造请求，冒充用户在站内的正常操作。

例如，一论坛网站的发贴是通过 GET 请求访问，点击发贴之后 JS 把发贴内容拼接成目标 URL 并访问：

  ``` 
  http://example.com/bbs/create_post.php?title=标题&content=内容
  ```
那么，我们只需要在论坛中发一帖，包含一链接：
  ``` 
  http://example.com/bbs/create_post.php?title=我是脑残&content=哈哈
  ```
只要有用户点击了这个链接，那么他们的帐户就会在不知情的情况下发布了这一帖子。可能这只是个恶作剧，但是既然发贴的请求可以伪造，那么删帖、转帐、改密码、发邮件全都可以伪造。

如何防范 CSRF 攻击？可以注意以下几点：

- 关键操作只接受POST请求

- 验证码

  CSRF攻击的过程，往往是在用户不知情的情况下构造网络请求。所以如果使用验证码，那么每次操作都需要用户进行互动，从而简单有效的防御了CSRF攻击。

  但是如果你在一个网站作出任何举动都要输入验证码会严重影响用户体验，所以验证码一般只出现在特殊操作里面，或者在注册时候使用。

- 检测 Referer

  常见的互联网页面与页面之间是存在联系的，比如你在 `www.baidu.com` 应该是找不到通往 `www.google.com` 的链接的，再比如你在论坛留言，那么不管你留言后重定向到哪里去了，之前的那个网址一定会包含留言的输入框，这个之前的网址就会保留在新页面头文件的 Referer 中

  通过检查 Referer 的值，我们就可以判断这个请求是合法的还是非法的，但是问题出在服务器不是任何时候都能接受到Referer的值，所以 Referer Check 一般用于监控 CSRF 攻击的发生，而不用来抵御攻击。

- Token

  目前主流的做法是使用 Token 抵御 CSRF 攻击。下面通过分析 CSRF 攻击来理解为什么 Token 能够有效

  CSRF攻击要成功的条件在于攻击者能够预测所有的参数从而构造出合法的请求。所以根据不可预测性原则，我们可以对参数进行加密从而防止CSRF攻击。

  另一个更通用的做法是保持原有参数不变，另外添加一个参数Token，其值是随机的。这样攻击者因为不知道Token而无法构造出合法的请求进行攻击。

  Token 使用原则

  - Token 要足够随机————只有这样才算不可预测
  - Token 是一次性的，即每次请求成功后要更新Token————这样可以增加攻击难度，增加预测难度
  - Token 要注意保密性————敏感操作使用 post，防止 Token 出现在 URL 中
  注意：过滤用户输入的内容不能阻挡 csrf，我们需要做的是过滤请求的来源。

# XSS（Cross Site Scripting，跨站脚本攻击）

XSS 全称“跨站脚本”，是注入攻击的一种。其特点是不对服务器端造成任何伤害，而是通过一些正常的站内交互途径，例如发布评论，提交含有 JavaScript 的内容文本。这时服务器端如果没有过滤或转义掉这些脚本，作为内容发布到了页面上，其他用户访问这个页面的时候就会运行这些脚本。

运行预期之外的脚本带来的后果有很多中，可能只是简单的恶作剧——一个关不掉的窗口：
``` javascript
  while (true) {
      alert("你关不掉我~");
  }
```
也可以是盗号或者其他未授权的操作。

XSS 是实现 CSRF 的诸多途径中的一条，但绝对不是唯一的一条。一般习惯上把通过 XSS 来实现的 CSRF 称为 XSRF。

如何防御 XSS 攻击？

理论上，所有可输入的地方没有对输入数据进行处理的话，都会存在XSS漏洞，漏洞的危害取决于攻击代码的威力，攻击代码也不局限于script。防御 XSS 攻击最简单直接的方法，就是过滤用户的输入。

如果不需要用户输入 HTML，可以直接对用户的输入进行 HTML escape 。下面一小段脚本：

``` html
  <script>window.location.href="http://www.baidu.com";</script>
```
经过 escape 之后就成了：

``` html
  &lt;script&gt;window.location.href=&quot;http://www.baidu.com&quot;&lt;/script&gt;
```
它现在会像普通文本一样显示出来，变得无毒无害，不能执行了。

当我们需要用户输入 HTML 的时候，需要对用户输入的内容做更加小心细致的处理。仅仅粗暴地去掉 script 标签是没有用的，任何一个合法 HTML 标签都可以添加 onclick 一类的事件属性来执行 JavaScript。更好的方法可能是，将用户的输入使用 HTML 解析库进行解析，获取其中的数据。然后根据用户原有的标签属性，重新构建 HTML 元素树。构建的过程中，所有的标签、属性都只从白名单中拿取。

---
# 摘自：

- [笔试面试知识整理](https://hit-alibaba.github.io/interview/basic/network/HTTP.html)