# iScroll

## 版本：

1 iscroll.js，
这个版本是常规应用的脚本。它包含大多数常用的功能，有很高的性能和很小的体积。
2 iscroll-lite.js，
精简版本。它不支持快速跳跃，滚动条，鼠标滚轮，快捷键绑定。但如果你所需要的是滚动(特别是在移动平台) iScroll 精简版 是又小又快的解决方案。
3 iscroll-probe.js，
探查当前滚动位置是一个要求很高的任务,这就是为什么我决定建立一个专门的版本。如果你需要知道滚动位置在任何给定的时间,这是iScroll给你的。（我正在做更多的测试,这可能最终在常规iscroll.js脚本，请留意）。
4 iscroll-zoom.js，
在标准滚动功能上增加缩放功能。
5 iscroll-infinite.js，
可以做无限缓存的滚动。处理很长的列表的元素为移动设备并非易事。 iScroll infinite版本使用缓存机制,允许你滚动一个潜在的无限数量的元素。

## 2 使用：

首先声明一个类：

`var myScroll = new IScroll('Selector')`

这里的Selector既可以是一个元素，也可以是一个字符串，会在内部调用querySelector方法；

初始化：

```
var myScroll = new IScroll('#execBox', {
    mouseWheel: true, 
    scrollbars: true, // 显示滚动条
     probeType: 3 // 配合3 iscroll-probe.js，实现检测scroll事件；
});
```


当DOM发生变化的时候，需要重新计算滚动条参数的时候，就使用 myScroll.refresh();

在myScroll对象中存放着很多数据，可以在console中查看
例如：
`maxScrollY` ---- 最大的滚动高度
`x / y` --- 滚动条当前位置

例子：弹性触发事件，当移动到最大高度后继续移动的时候触发，和移动到顶部的时候，继续移动时触发；

由于只有touch才会有弹性的运动，所以不能通过鼠标滚动实现；

```
    myScroll.on('scroll', function () {
        if (this.y < (this.maxScrollY - 50)) {
            alert(到顶时触发)
        }
        if (this.y > 50) {
             alert(到底时触发)
        }
    }
```


方法：

`myScroll.scrollTo(0, -2);`

语法：
`scrollTo(x, y, time, easing)`

部分翻译： http://www.linchaoqun.com/html/js/iscrollJs.jsp

事件：
```
    myScroll.on('scrollStart', function () {
        $(this.indicators[0].indicator).animate({
            opacity: 1
        }, 500)
    })
    myScroll.on('scrollEnd', function () {
        $(this.indicators[0].indicator).animate({
            opacity: 0
        }, 500)
    })
```