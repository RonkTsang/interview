# 浅复制 `&` 深复制
- [浅复制 `&` 深复制](#%E6%B5%85%E5%A4%8D%E5%88%B6-%E6%B7%B1%E5%A4%8D%E5%88%B6)
  - [`javaScript` 的变量类型](#javascript-%E7%9A%84%E5%8F%98%E9%87%8F%E7%B1%BB%E5%9E%8B)
  - [浅复制](#%E6%B5%85%E5%A4%8D%E5%88%B6)
  - [深拷贝](#%E6%B7%B1%E6%8B%B7%E8%B4%9D)
  - [拓展 堆（`heap`）和栈（`stack`）区别：](#%E6%8B%93%E5%B1%95-%E5%A0%86%EF%BC%88heap%EF%BC%89%E5%92%8C%E6%A0%88%EF%BC%88stack%EF%BC%89%E5%8C%BA%E5%88%AB%EF%BC%9A)
  - [拓展 `jQuery` 的 `extend`](#%E6%8B%93%E5%B1%95-jquery-%E7%9A%84-extend)
  - [参考](#%E5%8F%82%E8%80%83)

## `javaScript` 的变量类型

  - **基本类型**：
  6种基本数据类型`undefined`、`null`、`Boolean`、`Number`、`String` 和 `Symbol`，变量是直接按值存放的，存放在栈内存中的简单数据段，可以直接访问。

  - **引用类型**：
  存放在堆内存中的对象，变量保存的是一个指针，这个指针指向另一个位置。当需要访问引用类型（如对象，数组等）的值时，首先从栈中获得该对象的地址指针，然后再从堆内存中取得所需的数据。

  > `JavaScript` 存储对象都是存地址的，所以浅拷贝会导致 obj1 和obj2 指向同一块内存地址。改变了其中一方的内容，都是在原来的内存上做修改会导致拷贝对象和源对象都发生改变，而深拷贝是开辟一块新的内存地址，将原对象的各个属性逐个复制进去。对拷贝对象和源对象各自的操作互不影响。


  例如：

  ``` javascript

    var a = [1, 2]
    var b = a
    b.push(3)
    a // [1, 2, 3]

    // 要区别于：
    var a = [1, 2]
    var b = a
    b = []  // 此处改变了 b 的指向
    a       // [1, 2]

  ```
  可学习于《U don't know JS》中篇

---
## 浅复制

- 简单的引用复制

  ``` javascript
  function shallowClone(copyObj) {
    var obj = {};
    for ( var i in copyObj) {
      obj[i] = copyObj[i];
    }
    return obj;
  }
  var x = {
    a: 1,
    b: { f: { g: 1 } },
    c: [ 1, 2, 3 ]
  };
  var y = shallowClone(x);
  console.log(y.b.f === x.b.f);     // true

  y.b.f['test'] = 'no~'
  x.b.f // {g: 1, test: 'no~'}
  ```

- `Object.assign`

  `Object.assign`复制过来的引用类型依旧是浅复制

  ``` javascript

  var a = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2]
  }

  var y = Object.assign({}, a)

  y.b[u] = 5

  a.b // {f: {g: 1}, u: 5}

  ```

## 深拷贝

- 关于 `slice` 和 `concat`

  `Array`的`slice`和`concat`方法不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。之所以把它放在深拷贝里，是因为它**看起来像是深拷贝**。而实际上它是浅拷贝。原数组的元素会按照下述规则拷贝：

  - 如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。

  - 对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。

  ``` javascript

  var a = [1, 2, [3, 5]] 
  var a_shallow = a 
  var a_concat = a.concat() 
  var a_slice = a.slice(0) 

  a === a_shallow     // true 
  a === a_slice       // false，“看起来”像深拷贝
  
  // 接着，重点在这儿哦
  a_slice[2].push(6)

  a[2]              // [3, 5, 6]
  a_concat[2]       // [3, 5, 6]

  // 引用类型依旧是同一份引用
  ```

- `JSON`对象的 `parse` 和 `stringify`

  - `parse` : 将 `JSON` 字符串反序列化成 `JS` 对象
  - `stringify` : 将 `JS` 对象序列化成 `JSON` 字符串

  实现深拷贝：
  ``` javascript

  // 例一
  var source = { name:"source", child:{ name:"child" } } 
  var target = JSON.parse(JSON.stringify(source));
  target.name = "target";             //改变target的name属性
  source.name                         //source 
  console.log(target.name);           //target
  target.child.name = "target child"; //改变target的child 
  console.log(source.child.name);     //child 
  console.log(target.child.name);     //target child

  // 例二
  var source = {
    name:function(){        // name 为函数
      console.log(1);
    } 
  } 
  var target = JSON.parse(JSON.stringify(source));
  console.log(target.name); // undefined !!

  //例3
  var source = {
    child: new RegExp("e")    // child 为正则表达式
  }
  var target = JSON.parse(JSON.stringify(source));
  console.log(target.child);  // Object {} ！！
  ```
  不足：

  - 对于**正则表达式**类型、**函数**类型等无法进行深拷贝(而且会直接丢失相应的值)。
  - 还有一点不好的地方是它会**抛弃对象的 `constructo`r**。也就是深拷贝之后，不管这个对象原来的构造函数是什么，在深拷贝之后都会变成 `Object`。
  - 如果对象中存在**循环引用**的情况也无法正确处理。

- 实现深复制

  ``` javascript

    // 类型判断方法
    (function () {
      'use strict';

      var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');

      function type () {
        return Object.prototype.toString.call(this).slice(8, -1);
      }

      for (var i = types.length; i--;) {
        $['is' + types[i]] = (function (self) {
          return function (elem) {
            return type.call(elem) === self;
          };
        })(types[i]);
      }

      return $;
    })(window.$ || (window.$ = {}));

    function copy (obj,deep) {
      // 基本类型
      if (obj === null || (typeof obj !== "object" && !$.isFunction(obj))) { 
        return obj; 
      } 

      // 方法
      if ($.isFunction(obj)) {
        return new Function("return " + obj.toString())();
      }
      else {
        var name, target = $.isArray(obj) ? [] : {}, value; 

        for (name in obj) { 
          value = obj[name]; 
          console.log(name, value)

          if (value === obj) {
            continue;
          }

          if (deep) {
            // 数组 和 对象 通过递归复制形式
            if ($.isArray(value) || $.isObject(value)) {
              target[name] = copy(value,deep);
            } else if ($.isFunction(value)) {
              target[name] = new Function("return " + value.toString())();
            } else {
              target[name] = value;
            }
          } else {
            target[name] = value;
          } 
        } 
        return target;
      }　        
    }
  
  ```

---

## 拓展 堆（`heap`）和栈（`stack`）区别：

  **堆**和**栈**都是内存中的一部分，有着不同的作用，而且一个程序需要在这片区域上分配内存。

  区别堆（heap）栈（stack）空间分配大小需要自己申请，并指明大小系统自动分配释放存储区队列优先，先进先出（FIFO—first in first out）先进后出(FILO—First-In/Last-Out)缓存方式二级缓存，生命周期由虚拟机的垃圾回收算法来决定一级缓存，被调用时处于存储空间中，调用完毕立即释放。申请效率由new分配的内存，一般速度比较慢，而且容易产生内存碎片，不过用起来最方便、速度较快。但程序员是无法控制的。

  `javascript`的变量的存储方式

  - **栈**：自动分配内存空间，系统自动释放，里面存放的是**基本类型的值**和**引用类型的地址**

  - **堆**：动态分配的内存，大小不定，也不会自动释放。里面存放**引用类型的值**。

---

## 拓展 `jQuery` 的 `extend`

  ``` javascript
    // 使用例子

    var x = {
      a: 1,
      b: { f: { g: 1 } },
      c: [ 1, 2, 3 ]
    };

    var y = $.extend({}, x),          // shallow copy
        z = $.extend(true, {}, x);    // deep copy

    y.b.f === x.b.f       // true
    z.b.f === x.b.f       // false

    // 实现如下

    jQuery.extend = function() { 
      //给jQuery对象和jQuery原型对象都添加了extend扩展方法
      var options,  
          name, 
          src, 
          copy, 
          copyIsArray, 
          clone, 
          target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = false;

      // options是一个缓存变量，用来缓存arguments[i]
      // name是用来接收将要被扩展对象的key
      // src改变之前target对象上每个key对应的value
      // copy传入对象上每个key对应的value
      // copyIsArray判定copy是否为一个数组
      // clone深拷贝中用来临时存对象或数组的src
      // target 目标对象, 默认为第一个参数

      // 判断处理深拷贝的情况，target 为第二个参数
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        // i++ (即为 2) 跳过布尔值和目标 
        i++;
      }

      // 当 target不是 object 或者 function 的情况
      if (typeof target !== "object" && !jQuery.isFunction(target)) {
        target = {};
      }

      // 当参数列表长度等于 i 的时候，扩展 jQuery 对象自身。
      if (length === i) {
        target = this;
        --i;
      }

      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          // 扩展基础对象
          for (name in options) {
            src = target[name];
            copy = options[name];

            // 防止永无止境的循环
            // 如 var i = {};i.a = i;$.extend(true,{},i);如果没有这个判断变成死循环了
            if (target === copy) {
              continue;
            }
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false
                clone = src && jQuery.isArray(src) ? src: [] // 如果src存在且是数组的话就让clone副本等于src否则等于空数组。
              } else {
                clone = src && jQuery.isPlainObject(src) ? src: {} // 如果src存在且是对象的话就让clone副本等于src否则等于空数组。
              }
              // 递归拷贝
              target[name] = jQuery.extend(deep, clone, copy);
            } else if (copy !== undefined) {
              target[name] = copy; // 若原对象存在name属性，则直接覆盖掉；若不存在，则创建新的属性。
            }
          }
        }
      }
      // 返回修改的对象
      return target;
    };
  ```

  **这个版本无法正确处理源对象内部循环引用**

  ``` javascript
    var a = {"name":"a"}
    var b = {"name":"b"}
    a.child = b
    b.parent = a
    $.extend(true,{},a) // 直接报了栈溢出。Uncaught RangeError: Maximum call stack size exceeded
  ```

---

## 参考

  [深入剖析 JavaScript 的深复制 (好难看懂怎么办😭)](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)

  [JavaScript对象深拷贝/浅拷贝遇到的坑和解决方法 (这个有环的解决)](https://segmentfault.com/a/1190000013278803)