# `this` 丢失问题

- [`this` 丢失问题](#this-%E4%B8%A2%E5%A4%B1%E9%97%AE%E9%A2%98)
  - [一道题](#%E4%B8%80%E9%81%93%E9%A2%98)
  - [`this` 丢失](#this-%E4%B8%A2%E5%A4%B1)
  - [参考](#%E5%8F%82%E8%80%83)

## 一道题

  ``` javascript
  var length = 10;
  function fn () {
    console.log(this.length);
  }
  var obj = {
      length: 5,
      method: function (fn) {
        fn();
        arguments[0]();
      }
  }
  obj.method(fn, 1);
  ```
  会打印什么呢？

  答案是： `10, 2`

  第二个输出为 `2`：此时是打印出 `arguments` 的 `length`，如果是这样调用 `obj.method(fn, 1, 2)` 则 `length === 3`

  那第一个为什么是 `10` ?

  这就是常见的 `this` 丢失啦 ~

---

## `this` 丢失

  > `javascript` 判断 `this` 绑定的判定规则是**调用位置是否有上下文对象**，或者说是否被某个对象拥有或者包含

  ``` javascript
  function fn () {
    console.log(this.a);
  }  
  var obj = {
    a: 2,
    fn: fn
  }
  obj.fn(); //2
  ```

  需要注意的是 `fn()` 的声明方式，及其之后是如何被当作引用属性添加到 `obj` 中的。调用位置会使用 `obj` 的**上下文**来引用函数，因此你可以说**函数被调用时 obj 对象“拥有”或者“包含”它**。

  当函数引用有上下文对象时，函数调用中的 `this` 会绑定到这个上下文对象。因此调用 `fn()` 时 `this` 被绑定到 `obj` ，因此 `this.a` 和 `obj.a` 时一样的。
  
  那 `this` 丢失又是怎样的嘞？

  ``` javascript
  function fn () {
    console.log(this.a);
  }
  var obj = {
    a: 2,
    fn: fn
  }
  var bar = obj.fn; // 函数别名
  bar();            // undefined
  ```

  `bar` 是 `obj.fn` 的一个引用，但是实际上，它引用的是 `fn` 函数本身，因此此时的 `bar()` 其实是一个不带任何修饰的函数调用
  
  即 **丢失了绑定对象**，也就是说它会应用 **默认绑定**，从而把 `this` 绑定到 **全局对象** 上

  所以开头的题目就明了啦

  ``` javascript
  function (fn) { //fn其实引用的是function fn()
      fn(); //这里才是真正的调用位置
      arguments[0]();
    }
  ```

  类似的，在 `setTimeout()` 和 `setInterval()` 绑定函数也会丢失 `this`

  ``` javascript
  function fn () {
    console.log(this.a);
  }  
  var obj = {
    a: 2,
    fn: fn
  }
  var a = "global";

  setTimeout(obj.fn, 100);  // global

  // 显示绑定
  setTimeout(obj.fn.bind(obj), 0) // 2

  // 箭头函数
  obj.fnc = function () {
    setTimeout(() => this.fn(), 200)
  }

  obj.fnc()     // 2
  ```

  last one:
  
  ``` javascript
  function fn () {
    console.log(this.a);
  }
  var a = 2;
  var o = { a: 3, fn: fn};
  var p = { a: 4}
  o.fn();           // 输出？
  (p.fn = o.fn)();  // 输出？
  p.fn()            // 嗯?
  ```
  输出：`3 2 4`

  第二个跟第三个区别：

  - 第二个是一个赋值语句哦，`p.fn = o.fn` 会返回结果值，即 `fn` , 接着 `(fn)()` 立即执行函数，所以看得出是，应用到 **默认绑定** 了

  - 第三个是通过 `p` 去调用，所以调用函数的上下文是 `p`，`this` 绑定到 `p`
  
---

## 参考

应该说是原文了hhh，改了部分

这里：[从一道前端笔试题分析 javascript 中 this 的使用陷阱 ](https://github.com/wengjq/Blog/issues/21)