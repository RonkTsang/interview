# BFC

## 什么是`BFC`

> `BFC`(Block Formatting Context)是Web页面中盒模型布局的CSS渲染模式。它的定位体系属于常规文档流。从功能上，BFC 可以看作是**隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素**, 并且 BFC 具有普通容器没有的一些特性，例如可以包含浮动元素

## `BFC`的**布局规则**

- 内部的Box会在垂直方向，一个接一个地放置。

- Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠

- 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

- BFC的区域不会与`float box`重叠。

- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

- 计算BFC的高度时，浮动元素也参与计算

## 生成 BFC

> **浮动**，**绝对定位元素**，`inline-blocks`, `table-cells`, `table-captions`,和`overflow`的值不为`visible`的元素，（除了这个值已经被传到了视口的时候）将创建一个新的块级格式化上下文。

即为, 一个`BFC`至少满足下列条件中的任何一个：

- `float` 的值不为 `none`

- `position` 的值不为 `static` 或者 `relative`

- `display` 的值为 `table-cell`, `table-caption`, `inline-block`,`flex`, 或者 `inline-flex`中的其中一个

- `overflow`的值不为 `visible`

## BFC 的特性

- ### `BFC` 会阻止[**外边距折叠**](MarginCollapse.md)

- ### `BFC` 可以**包含浮动**的元素

- ### `BFC` 可以阻止元素被浮动元素覆盖

---

[](http://kayosite.com/block-formatting-contexts-in-detail.html)