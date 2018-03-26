# 主干架：
- 1. 从浏览器接收url到开启网络请求线程（这一部分可以展开[浏览器的机制以及进程与线程](../browser/浏览器进程和线程.md)之间的关系）

- 2. 开启网络线程到发出一个完整的 http 请求（这一部分涉及到[dns查询](./DNS.md)，[tcp/ip请求](./TCP.md)，五层因特网协议栈等知识）

- 3. 从服务器接收到请求到对应后台接收到请求（这一部分可能涉及到负载均衡，安全拦截以及后台内部的处理等等）

- 4. 后台和前台的http交互（这一部分包括http头部、响应码、报文结构、cookie等知识，可以提下静态资源的cookie优化，以及编码解码，如gzip压缩等）

- 5. 单独拎出来的缓存问题，[http的缓存](../performance/缓存.md)（这部分包括http缓存头部，etag，catch-control等）

- 6. 浏览器接收到http数据包后的[解析流程](../browser/浏览器渲染.md)（解析html-词法分析然后解析成dom树、解析css生成css规则树、合并成render树，然后layout、painting渲染、复合图层的合成、GPU绘制、外链资源的处理、loaded和domcontentloaded等）

- 7. CSS的可视化格式模型（元素的渲染规则，如包含块，控制框，BFC，IFC等概念）

- 8. JS引擎解析过程（JS的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）

- 9. 其它（可以拓展不同的知识模块，如跨域，web安全，hybrid模式等等内容）

# 参考
- [从输入URL到页面加载的过程？如何由一道题完善自己的前端知识体系！](http://www.dailichun.com/2018/03/12/whenyouenteraurl.html)