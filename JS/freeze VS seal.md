# freeze VS seal
- [freeze VS seal](#freeze-vs-seal)
  - [`Object.freeze()`](#objectfreeze)
  - [`Object.seal()`](#objectseal)
  - [区别](#%E5%8C%BA%E5%88%AB)
  - [`freeze` 的注意点](#freeze-%E7%9A%84%E6%B3%A8%E6%84%8F%E7%82%B9)
  - [参考](#%E5%8F%82%E8%80%83)
## `Object.freeze()`

> 冻结一个对象，不能添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象**永远不可变**。该方法返回被冻结的对象。

## `Object.seal()`

> 让一个对象密封，并返回被密封后的对象。密封对象将会阻止向对象添加新的属性，并且会将所有已有属性的可配置性（`configurable`）置为不可配置（`false`），即不可修改属性的描述或删除属性。**但是可写性描述（`writable`）为可写（`true`）的属性的值仍然可以被修改**。

## 区别

- 用`Object.seal()`密封的对象可以改变它们现有的属性。
- 用`Object.freeze()` 冻结的对象中现有属性是不可变的。

## `freeze` 的注意点

``` javascript
obj1 = {
  internal: {}
};

Object.freeze(obj1);
obj1.internal.a = 'aValue';

obj1.internal.a // 'aValue'
```

可以看出，`freeze` 实际为 **浅冻结**

要使对象不可变，需要递归冻结每个类型为对象的属性，即深冻结。(此处未考虑 **环** 的情况)

``` javascript

// 深冻结函数
function deepFreeze(obj) {

  // 取回定义在obj上的属性名
  var propNames = Object.getOwnPropertyNames(obj);

  // 在冻结自身之前冻结属性
  propNames.forEach(function(name) {
    var prop = obj[name];

    // 如果prop是个对象，冻结它
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // 冻结自身(no-op if already frozen)
  return Object.freeze(obj);
}

obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
obj2.internal.a; // undefined
```

## 参考

- [MDN Object.seal](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)

- [MDN Object.freeze](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)