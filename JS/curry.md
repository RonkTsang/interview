# 函数柯里化

- [函数柯里化](#%E5%87%BD%E6%95%B0%E6%9F%AF%E9%87%8C%E5%8C%96)
  - [curry简单实现](#curry%E7%AE%80%E5%8D%95%E5%AE%9E%E7%8E%B0)
  - [多次传参的柯里化](#%E5%A4%9A%E6%AC%A1%E4%BC%A0%E5%8F%82%E7%9A%84%E6%9F%AF%E9%87%8C%E5%8C%96)
  - [参考](#%E5%8F%82%E8%80%83)
## curry简单实现

  ``` javascript

  function curry(fn) {
    // 把第一次调用的参数存起来
    var _args = Array.prototype.slice.call(arguments, 1);
    // 返回 柯里化 后得到的函数
    return function() {
      // 获得新传入的参数
      var _newArgs = Array.prototype.slice.call(arguments);
      // 组合参数
      var _totalArgs = _args.concat(_newArgs);
      return fn.apply(this, _totalArgs);
    }
  }

  ```

  使用如下：
  ``` javascript

  function showMsg(name, age, fruit) {
    console.log('My name is ' + name + ', I\'m ' + age + ' years old, ' + ' and I like eat ' + fruit);
  }

  var curryingShowMsg1 = curry(showMsg, 'dreamapple');
  curryingShowMsg1(22, 'apple'); 
  // My name is dreamapple, I'm 22 years old,  and I like eat apple

  var curryingShowMsg2 = curry(showMsg, 'dreamapple', 20);
  curryingShowMsg2('watermelon'); 
  // My name is dreamapple, I'm 20 years old,  and I like eat watermelon

  ```

## 多次传参的柯里化

``` javascript

function betterCurry(fn, len) {
  // 获取传入函数的参数 数量
  var length = len || fn.length;
  return function () {
    // 传入的参数数量
    var allArgsFulfilled = (arguments.length >= length);

    // 如果参数全部满足,就可以终止递归调用
    if (allArgsFulfilled) {
      return fn.apply(this, arguments);
    } else {
      // 组合新的参数用于当作 arguments
      var argsNeedFulfilled = [fn].concat(Array.prototype.slice.call(arguments));
      // 递归 ，使用 上面实现的 curry 保存参数并返回一个已经柯里化的函数作为betterCurry的函数
      return betterCurry(curry.apply(this, argsNeedFulfilled), length - arguments.length);
    }
  };
}

```
比如可以这样用：
``` javascript

function add4 (a, b, c, d) {
  console.log(a + b + c + d)
}

var cAdd4 = betterCurry(add4)

cAdd4(1)(2)(3)(4) // 10
```

---

## 参考

- [掌握JavaScript函数的柯里化](https://github.com/dreamapplehappy/hacking-with-javascript/blob/master/books/javascript-the-good-parts/chapter-4-function/currying.md)

- [浅谈函数式编程柯里化的魔法](https://juejin.im/entry/58a11ca261ff4b006b4f8755/)