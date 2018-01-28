# SEO

## 什么是`SEO`

**SEO**（Search Engine Optimization），就是传说中的搜索引擎优化，是指为了增加网页在搜索引擎自然搜索结果中的收录数量以及提升排序位置而做的优化行为。
> SEO更象是一个商业行为，而不是技术手段

## 前端的SEO优化

  - 添加特地标签，突出重要内容

    合理的`title`、`description`和`keywords`，虽然现在搜索对这三项的权重慢慢减小，但还是只写有用的东西，要表达重点。

    **title**：只强调重点即可，重要关键词出现不要超过2次，而且要靠前，每个页面title要有所不同

    **description**：把网页内容高度概括到这里，长度要合理，不可过分堆砌关键词

    **keywords**：列举出几个重要关键词即可，也不可过分堆砌。

    ```html
    <title>网站标题</title>
    <meta name="Description" content="把网页内容高度概括到这里，长度要合理，不可过分堆砌关键词" />
    <meta name="Keywords" content="web, seo ...">
    ```

  - 标签语义化

    对于搜索引擎来说，最直接面对的就是网页HTML代码，如果代码写的语义化，搜索引擎就会很容易的读懂该网页要表达的意思

  - 标签的使用

    `<a>`: 增加说明 `title`， 对于指向其他网站的链接，指定 `rel="nofollow"`，即不要爬取这个外链了

    ```html
    <a href="http://example.com" rel="nofollow">no follow 链接</a>
    ```

    `<img>`: 使用`alt`增加说明
    ```html
    <img src="" alt="seo优化" width="200" height="100" />
    ```

  - 利用布局，把重要内容HTML代码放在最前面

    搜索引擎抓取HTML内容是从上到下，利用这一特点，可以让主要代码优先读取，广告等不重要代码放在下边。

  - 重要内容不要用JS输出

    蜘蛛不会读取JS里的内容，所以重要内容必须放在HTML里。

  - URL优化

    现在搜索引擎的爬行能力是可以不用做静态化的，但是从收录难易度，用户体验及社会化分享，静态简短的URL都是更有利的 [(参考)](http://imweb.io/topic/5682938b57d7a6c47914fc00)
    
  - `robots.txt`

    搜索引擎蜘蛛访问网站时会第一个访问`robots.txt`文件，`robots.txt`用于指导搜索引擎蜘蛛禁止抓取网站某些内容或只允许抓取那些内容，放在站点根目录。[(参考)](http://imweb.io/topic/5682938b57d7a6c47914fc00)
    
  - 尽少使用iframe框架

    搜索引擎不会抓取到iframe里的内容，重要内容不要放在框架中。

  - 提高网站加载速度

    网站加载速度过慢导致爬虫放弃

  - 扁平化结构
    
    层次结构超过三层小蜘蛛就不愿意爬了

    - 控制首页链接数量
    
    - 扁平化的目录层次
    
        跳转3次可以到达网站内任何一个内页，网站的设计主页、栏目、内容页，不要用纵性的结构
        
    - 导航SEO优化
    
        主导航、副导航、分类导航，
        导航尽量使用文字、使用图片需要添加相应的`title`、`alt`、`<a>` 等
        
        增加面包屑导航：提升用户体验、让搜索引擎清楚结构，同时还增加了内部链接，以便于抓取，降低跳出率

    - 网站内容页，不可忽视细节
        
        结构：
        
        ```
        【      logo及导航      】
        【  正文  】【 热门连接 】
        【   版权信息 友情链接  】
        ```
        
        分页：
        
        ```
        首页 1 2 3 4 5 6 7 【👇下拉选择】
---

[百度搜索引擎优化指南2.0](https://ziyuan.baidu.com/college/courseinfo?id=193&page=3)

[SEO优化实战 -- IMWeb社区](http://imweb.io/topic/5682938b57d7a6c47914fc00)

[浅谈前端与SEO -- 360UXC](http://uxc.360.cn/archives/984.html)

[前端开发中的SEO](https://segmentfault.com/a/1190000002994538)

[SEO技术博客](https://www.seozac.com/seo-tips/page/3/)
