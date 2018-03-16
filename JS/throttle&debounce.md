# 函数防抖 和 函数节流

---

- **函数防抖**: 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。
- **函数节流**: 指定时间间隔内只会执行一次任务；

## 函数防抖

  以输入框应用为例，输入停止超过2秒打印出输入内容，输入期间不打印

  即 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行

  ``` javascript
  input.addEventListener('keyup', debounce(function (e) {
    console.log(this.value)
  }, 2000))
  
  // 防抖
  function debounce(fn, delay) {
    // 私有 timer
    let timer = null
    // 返回一个防抖函数
    return function (...args) {
      // 每次调用时，清除定时器，以阻止执行 fn
      clearTimeout(timer)
      // 然后再重新计时
      timer = setTimeout(() => {
        // 这里使用的是 箭头函数，this 将绑定到 input
        fn.apply(this, args)
      }, delay);
    }
  }
  ```

---

## 函数节流

  以滚动窗口为例，如果直接的给 `window` 加个 `scroll` 事件，并绑定函数打印信息，想想这样会有什么问题呢？

  是不是就会不断触发呢？一直滚动就一直触发事件执行函数，这样对性能其实是不友好的

  所以噢，就有了 **函数节流** 的出现了，在指定时间间隔内只会执行一次任务
  
  ``` javascript

  function throttle (fn, interval = 300) {
    var timer = null
    return function (...args) {
      if (timer) {
        return
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
        clearTimeout(timer)
        timer = null
      }, interval)
    }
  }
  
  window.addEventListener('scroll', throttle(function (e) {
    console.log(parseInt(document.documentElement.scrollTop))
  }, 500))
  

  ```