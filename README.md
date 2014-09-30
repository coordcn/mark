mark
====

JsonML template

[JsonML](http://www.jsonml.org/) 是以json数组来描述html的一种模板语言，整个实现参考了[jqml](https://github.com/trevnorris/jqml)和[makrdown-js](https://github.com/evilstreak/markdown-js)，并在这些代码的基础上加入了模板引用的实现。


markc.js是客户端实现，marks.js是服务端实现。

markc.js有两个函数，dom(template, [data])直接通过dom构建html元素，元素可以添加事件，返回dom节点。

html(template, [data])返回html字符串，使用innerHtml加入。

marks.js有一个函数，html(template, [data])返回html字符串。

具体使用请看test及[JsonML](http://www.jsonml.org/) 
