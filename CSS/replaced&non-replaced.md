# replaced & non-replaced element

> 从元素本身的特点来讲，可以分为 **可替换元素** (replaceable element)和 **不可替换元素** (none-replaceable element)。

> it is best to read “replaced” as **“embedding”**

- ## **replaced element 可替换元素**

  > CSS 里，可替换元素（replaced element）的展现不是由CSS来控制的。这些元素是一类 外观渲染独立于CSS的 外部对象。
  >
  > 典型的可替换元素有` <img>`、 `<object>`、 `<video>` 和 表单元素，如`<textarea>`、 `<input>` 。 
  >
  > 某些元素只在一些特殊情况下表现为可替换元素，例如 `<audio>` 和 `<canvas>` 。 通过 `CSS content` 属性来插入的对象 被称作 **匿名可替换元素**（anonymous replaced elements）。
  >
  > CSS在某些情况下会对可替换元素做特殊处理，比如计算外边距和一些auto值。

  元素本身没有实际内容，最终显示内容需要浏览器根据元素某些属性去判断的元素。

  如`<img>`元素，其最终的显示内容是由属性`src`决定的，它的固有尺寸就是原始图片大小; 

  如`<input>`元素，其最终显示的效果是由属性`type`决定的。

- ## **non-replaced element 不可替换元素**

  所谓非替换元素和替换元素相反，元素本身是有实际内容的，浏览器会直接将其内容显示出来，而不需要根据元素属性来判断到底显示什么内容。

  如 `<span> this is the content </span>`，元素内容就是“this is the content”。

  HTML中大多数是 **非替换元素** (non-replaced element)。

---

## 关于设置高度

- 对于块级元素

  > 块级元素具有height和width属性，可以通过他们直接设置宽和高

- 对于**可替换**的元素（行内元素）

  > 替换元素一般有内在尺寸和宽高比(auto时起作用)，所以具有width和height，可以设定。
  例如你不指定img的width和height时，就按其内在尺寸显示，也就是图片被保存的时候的宽度和高度。
  对于表单元素，浏览器也有默认的样式，包括宽度和高度。

- 对于不可替换元素（行内元素）

  > 通过 `line-height` 属性来设置行高

## More

[什么是 replaced / non-replaced element](http://justnewbee.github.io/frontend/2014/12/09/html-replaced-element.html)

[what is a non-replaced inline element?](https://stackoverflow.com/questions/12468176/what-is-a-non-replaced-inline-element)

[MDN: 可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element)