# <!DOCTYPE> 标签

- ## 作用

一般一个基本html页面的结构

```html
<html>
  <head>
    <title>我是基本的页面结构</title>
  </head>
  <body>
  </body>
</html>
```
浏览器要怎么来解析呢😂?

这就是`doctype`的作用啦~

> **`<!DOCTYPE>`约定浏览器使用哪种模式渲染页面**

- 当没有引入 `doctype` 标签时，页面是按照怪异模式(`quirks mode`)渲染

- 当引入 `doctype` 标签后，页面就是按照 `doctype` 标签的声明的标准，对各元素进行解析来渲染。这个时候由于声明的标准都是一致的，浏览器在对各元素的渲染方式也就相同了，页面就处于标准模式(`strict mode`)

[渲染模式](./MODE.md)

> **`<!DOCTYPE>`约定浏览器使用什么版本的`html`解析页面**

关于`html`的一些历史：

在`HTML 4.01`中,`DOCTYPE`声明引用`DTD`，基于`SGML`的语言标准。`DTD`的标记语言的规则，使浏览器可以正确呈现。
`HTML5`时代的到来，已经不基于`SGML`，所以也不需要引用`DTD`了。

也就是：**`<!DOCTYPE>` 声明`html`文档引用哪个`DTD`， 和哪个`html`版本来解析`html`文档。**

（`DTD`: 文档类型定义（DTD）可定义合法的XML文档构建模块。它使用一系列合法的元素来定义文档的结构。DTD 可被成行地声明于 XML 文档中，也可作为一个外部引用。）

常见：

`<!DOCTYPE>`也存在着三种风格： `Strict` (严格)、 `Transitional`（过渡）、 `Frameset`（框架集）

- `HTML4.01 strict`：不允许使用表现性、废弃元素（如font）以及frameset。声明：

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

- `HTML4.01 Transitional:`允许使用表现性、废弃元素（如font），不允许使用frameset。声明：

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

```

- `HTML4.01 Frameset:`允许表现性元素，废气元素以及frameset。声明：

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

- `XHTML1.0 Strict:`不使用允许表现性、废弃元素以及frameset。文档必须是结构良好的XML文档。声明：
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

- `XHTML1.0 Transitional`:允许使用表现性、废弃元素，不允许frameset，文档必须是结构良好的XMl文档。声明： 
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

- `XHTML 1.0 Frameset`:允许使用表现性、废弃元素以及frameset，文档必须是结构良好的XML文档。声明：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

- `HTML 5`: （标准模式）

```html
<!doctype html>
```

  问：HTML5 为什么只需要写 `<!DOCTYPE HTML>`？

    答：HTML5 不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行；
    而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

---

- 怪异模式：不写doctype
- 标准模式：HTML 5写法
- 接近标准模式： 其他