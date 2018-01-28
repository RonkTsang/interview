# Web Storage & Cookie

## Web Storage

  ### Web Storage 提供两种类型的API：

  - [`sessionStorage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage): 
  
    存储的数据只在**会话期间**有效，关闭浏览器则自动删除。
  
  - `localStorage`: 
  
    在本地**永久性**存储数据，除非显式将其删除或清空

  ### 两者异同
    
  - 相同点

    - 他们都可以用来存储信息
    - 都可以被用户清除
    - 存储在里面的数据都很容易通过客户端读出或者改变
    - 都尽量**不要存储敏感的、和安全相关**的信息
    
  - 不同点

    - 存储的生命周期不同

## Cookies

  - `Session Cookies` - 这是一个暂时的 `Cookies` 文件，但你关闭浏览器之后，它就会被销毁，常用于购物车的应用

  - `Persistent Cookies` - 这会一直在你的浏览器中直到你删除它，它可以记录你的登录信息和设置。常用登录验证和语言设置

  > 一般来说， Cookies 用来存储**引证信息**，作为客户端与服务器交互的通道，保持客户端状态。
  
  ### Cookies 的缺陷：

  - 数据大小：
  
    作为存储容器，`cookie`的大小限制在4KB左右，尤其对于现在复杂的业务逻辑需求，4KB的容量除了存储一些配置字段还简单单值信息，对于绝大部分开发者来说真的不知指望什么了。

  - 安全性问题：
    
    由于在HTTP请求中的`cookie`是明文传递的（HTTPS不是），带来的安全性问题还是很大的。

  - 网络负担：
  
    我们知道`cookie`会被附加在每个HTTP请求中，在`HttpRequest` 和`HttpResponse`的`header`中都是要被传输的，所以无形中增加了一些不必要的流量损失。

## Web Storage VS Cookies

- Cookies 由服务端生成，一般情况下浏览器不会修改

- Cookies 只可以存储字符串, sessionStorage 和 localStorage 就可以存储除了 Objects 和 Arrays 之外的 JavaScript 的函数，一般通过 API 去 存储 JSON

- sessionStorage 还可以让你存储符合你服务器端语言的任何函数对象
- Cookies 的容量限制在了 4KB,而 Storage 可以 5MB

- Cookies 一旦设置了之后，每个 http 请求都会带上 Cookies，而 Web Storage 不会

- Web Storage 比 Cookies 操作简单

## 应用场景

每个 HTTP 请求都会带着 Cookie 的信息，所以 Cookie 当然是能精简就精简，比较常用的一个应用场景就是判断用户是否登录。

针对登录过的用户，服务器端会在他登录时往 Cookie 中插入一段加密过的唯一辨识单一用户的辨识码，下次只要读取这个值就可以判断当前用户是否登录啦。

曾经还使用 Cookie 来保存用户在电商网站的购物车信息，如今有了 localStorage，似乎在这个方面也可以给 Cookie 放个假了~

而另一方面 localStorage 接替了 Cookie 管理购物车的工作，同时也能胜任其他一些工作。比如HTML5游戏通常会产生一些本地数据，localStorage 也是非常适用的。

如果遇到一些内容特别多的表单，为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 sessionStorage 的作用就发挥出来了