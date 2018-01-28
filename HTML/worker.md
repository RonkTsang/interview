# [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

## what

> `Web Worker`为`Web`内容在后台线程中运行脚本提供了一种简单的方法。**线程可以执行任务而不干扰用户界面**。此外，他们可以使用`XMLHttpRequest`执行 `I/O`  (尽管`responseXML`和通道属性总是为空)。一旦创建， 一个`worker` 可以将消息发送到创建它的`JavaScript`代码, 通过将消息发布到该代码指定的事件处理程序 (反之亦然)。
>
> 这意味着`Worker`运行代码不仅不会影响浏览器UI，也不会影响其他`Worker`中运行的代码。

## 使用事项

在worker线程中的代码，包含有大量window对象之下的东西，包括WebSockets，IndexedDB，不过有一些**例外**情况。比如：**在worker内直接操作DOM节点，或者使用window对象的默认方法和属性。**

- `navigator`对象: 包括四个属性：appName，appVersion，appVersion，userAgent

- `location`对象:与`window.location`一样，不过所有的属性都是只读的

- `self`对象，指向worker的上下文(DedicatedWorkerGlobalScope / SharedWorkerGlobalScope)

- `importScripts()`方法，用来加在 worker 所用到的外部JavaScript文件

- `close()`方法，用来立刻停止 worker 运行

> 通过 `importScripts()` 方法，可以接收一个或者多个文件，URL作为参数，其调用方式是阻塞式的，直到所有文件加载完才继续执行脚本（但这并不会影响UI线程）

## 适用场景：

- 编码/解码大字符串

- 复杂数学运算，包括图像或视频处理

- 大数组排序


## 缺点

- 无法修改DOM

- 无法跨域

- 各浏览器实现Web Worker不一致，可能出现差别问题
