# `documentElement` VS `body`

在实现获取网页整个高度、滚动高度、当前窗口高度时遇到的一个问题

到底是要用 `document.documentElement.scrollTop` 还是 `document.body.scrollTop` 嘞？

自己试了下， `document.body.scrollTop` 一直为 `0` 😕， `documentElement` 则是可以的

## `DTD` 的影响

- 页面具有 DTD，或者说指定了 `DOCTYPE` 时，使用 `document.documentElement`

- 页面不具有 DTD，或者说没有指定了 `DOCTYPE`，时，使用 `document.body`

## 关于两者

- `body` 是DOM对象里的body子节点，即 `<body>` 标签；

- `documentElement` 是整个节点树的根节点root，即 `<html>` 标签

## 常用

- 兼容：

  比如窗口大小
  ``` javascript
  var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  ```

- 判断是否滚到底

  ``` javascript

  let pageHeight = document.documentElement.scrollHeight,
      clientHeight = document.documentElement.clientHeight,
      scrollHeight = document.documentElement.scrollHeight
  
  pageHeight == clientHeight + scrollHeight
  ```
  实际上，并不完全相等，会有误差，需要做一个范围的判断

---

## 关于更多高度宽度啊看看这儿

- [document.documentElement和document.body的区别](http://www.cnblogs.com/ckmouse/archive/2012/01/30/2332070.html)

- [JS 获取屏幕、浏览器、页面的高度宽度](https://segmentfault.com/a/1190000010443608)

- [Js中ScrollTop、ScrollHeight、ClientHeight、OffsetHeight等整理 ](https://github.com/iuap-design/blog/issues/38)

- [视口的宽高与滚动高度](http://harttle.land/2016/04/24/client-height-width.html)