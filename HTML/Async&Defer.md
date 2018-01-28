# `Async` & `Defer`

- 没有 `defer` 或 `async`

  ```html
  <script src="script.js"></script>
  ```
  
  浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

- `async`

  ```html
  <script async src="script.js"></script>
  ```
  加载和渲染后续文档元素的过程将和 `script.js` 的加载与执行并行进行（异步）。

- `defer`

  ```html
  <script defer src="myscript.js"></script>
  ```

  加载后续文档元素的过程将和 `script.js` 的加载并行进行（异步），但是 `script.js` 的执行要在所有元素解析完成之后，`DOMContentLoaded` 事件触发之前完成。

- **不同**

  - `defer` 是按照加载顺序执行脚本的，这一点要善加利用

  - `async` 则是一个乱序执行的主，反正对它来说脚本的加载和执行是紧紧挨着的，所以不管你声明的顺序如何，只要它加载完了就会立刻执行

---

![](./img/async&defer.png)