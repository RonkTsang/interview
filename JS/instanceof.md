# `instanceof`

## 基本用法

  ``` javascript
  // 判断 foo 是否是 Foo 类的实例 , 并且是否是其父类型的实例
  function Aoo(){} 
  function Foo(){} 
  Foo.prototype = new Aoo();//JavaScript 原型继承
  
  var foo = new Foo(); 
  console.log(foo instanceof Foo)//true 
  console.log(foo instanceof Aoo)//true
  ```

## 运算符代码

  有些比较复杂的情况有时比较难分析，但我们可以从它实现代码去理解

  ``` javascript
  function instance_of(L, R) {
    //L 表示左表达式，R 表示右表达式
    var O = R.prototype;  // 取 R 的显示原型
    L = L.__proto__;      // 取 L 的隐式原型
    while (true) { 
      if (L === null) 
        return false; 
      if (O === L)  // 重点：当 O 严格等于 L 时，返回 true 
        return true; 
      L = L.__proto__; 
    } 
  }
  ```
  另外附有（**重要哦**）：

  ![](./img/instanceof.jpg)

## 试着分析

  - `Object instanceof Object`

  ``` javascript
  // 为了方便表述，首先区分左侧表达式和右侧表达式
  ObjectL = Object, ObjectR = Object; 
  // 下面根据规范逐步推演
  O = ObjectR.prototype = Object.prototype 
  L = ObjectL.__proto__ = Function.prototype 
  // 第一次判断
  O != L 
  // 循环查找 L 是否还有 __proto__ 
  L = Function.prototype.__proto__ = Object.prototype 
  // 第二次判断
  O == L 
  // 返回 true
  ```

  - [继承这一部分](/extend.md)中 `SubClass instanceof SuperClass`

  ![](./img/instanceof_1.jpg)
  (凑合看吧哈哈哈哈哈 😝)

  可以看到的是
  `SubClass.__proto__` 怎样都不会是 `SuperClass.prototype`，所以判断结果是 `false`

  但如果是 `SubClass.prototype instanceof SuperClass` 就是 `true` 了呀 ~