# 严格模式 (Standards mode) & 怪异模式 (Quirks mode)

  在很久以前的网络上，页面通常有两种版本：
  - 为网景（Netscape）的 Navigator准备的版本
  - 为微软（Microsoft）的 Internet Explorer准备的版本。
  
  当 W3C 创立网络标准后，为了不破坏当时既有的网站，浏览器不能直接起用这些标准。因此，浏览器采用了两种模式，用以把能符合新规范的网站和老旧网站区分开。

  目前浏览器的排版引擎有三种模式：
  
  - **怪异模式**（Quirks mode）
    
    排版会模拟 Navigator 4 与 Internet Explorer 5 的非标准行为。为了支持在网络标准被广泛采用前，就已经建好的网站，这么做是必要的。

  - **标准模式**（Standards mode）。

    行为即（但愿如此）由 HTML 与 CSS 的规范描述的行为。

  - **接近标准模式**（Almost standards mode）
    
    在接近标准模式下，只有少数的怪异行为被实现。
  
  
## 浏览器如何决定用哪个模式？

答案是：[通过文件开头的**DOCTYPE**](/DOCTYPE.md)

- 怪异模式：不写doctype
- 标准模式：HTML 5写法
- 接近标准模式： 其他

## js判断哪种模式

```javascript
document.compatMODE
// css1Compat   标准模式
// BackCompat   混杂模式
// undefined    混杂模式
```

## 怪异模式与标准模式的差异

- 盒模型不一致

  ```
  box width = content width + padding left + padding right + border left + border right;

  box height = content height + padding top + padding bottom + border top + border bottom;
  ```
  这是怪异模式下的盒子的宽高，也称为**IE盒模型**，与标准盒模型宽高不一样，下面为标准盒模型

  ```
  box width = content width;

  box height = content height;
  ```

- `inline` 元素尺寸问题

  `span` 就是 [`non-replaced`](./../CSS/replaced&non-replaced.md) 元素，在怪异模式下，定义这些元素的 width 和 height 属性，是可以影响该元素的尺寸大小的。

- 怪异模式下 `body` 高度为 `100%`

- `overflow`:

  当我们的 `overflow: visible`(默认) 的时候，字会超过这个盒子显示。但是在怪异的模式下，盒子的大小就会被改变，如果盒子有背景色或者边框的时候，就会很容易被发现。


## more

[What's the Difference Between Standards Mode and Quirks Mode](https://github.com/jasonliao/prepare-for-interview/blob/master/HTML/whats-the-difference-between-standards-mode-and-quirks-mode.md)