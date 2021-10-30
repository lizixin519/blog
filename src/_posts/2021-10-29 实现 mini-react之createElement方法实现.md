---
category: mini-react
tags:
    - rmini-eact
    - babel
date: 2021-10-29
title: 实现 mini-react(二)：createElement方法实现
---

实现 mini-react(二)：createElement 方法实现

<!-- more -->

### 1. jsx 语法

在 react 配合 jsx 语法使用，通过 babel 的转译将 jsx 转译为浏览器可识别的 dom 元素。

```js
<div>
    <p>test</p>
</div>
```

上述代码经过编译会编译成下述结构

```js
React.createElement('div', null, React.createElement('p', null, 'test'));
```

可以看到 jsx 语法被 React.createElement 转译。
可以通过 bebel 在线编译: [bebel 在线编译](https://babeljs.io/repl)

### 2. 实现 react.createElement

从上述代码中可以看到，createElement 有三个参数

-   type: 元素的类型
-   props: 元素的属性
-   children: 子元素集合

我们创建一个项目来测试 mini-react,

```js
export default function createElement(type, props, ...children) {
    return {
        type,
        props,
        children,
    };
}
```

这样就可已得到初步的结果，

```
<div className="container">
    <p>我是一段文字</p>
    <div>
        <p>我是嵌套的文字</p>
    </div>
    {false && <div>我不应该展示出来</div>}
    {true && <div>我应该展示出来</div>}
</div>
```

结果被编译成了下述结构

```js
{
    children: [
        0:
        children: ['我是一段文字']
        props: null
        type: "p"
        1: {type: 'div', props: null, children: Array(1)}
        2: false
        3: {type: 'div', props: null, children: Array(1)}
    ],
    props: {className: 'container'},
    type: "div"
}
```

这块我们发现有几个问题

1. 当子元素是文字时直接生成的是一段文本
2. 当值为 boolean 值的时候直接为 false

我们在原有的基础上稍加改动

```js
export default function createElement(type, props, ...children) {
    const handleChildren = [].concat(...children).reduce((result, child) => {
        // 判断child是否为boolean型且不能为空
        if (child !== false && child !== true && child !== null) {
            // 判断child是否为文本节点
            if (child instanceof Object) {
                result.push(child);
            } else {
                // 如果child为文本节点，则重新调用createElement方法，将文本转化为text类型的对象
                result.push(createElement('text', { textContent: child }));
            }
        }
        return result;
    }, []);
    return {
        type,
        props,
        children: handleChildren,
    };
}
```

此时我们在看输出则已经恢复正常。

我们在使用 react 开发的时候，父节点可以通过 props.children 获取子节点的数据，所以我们需要在返回值上重新赋值给 props

```js
export default function createElement(type, props, ...children) {
    ...
    ...
    return {
        type,
        props: {children: handleChildren, ...props},
        children: handleChildren,
    }
}
```

至此我们的 createElement 方法已经实现完成。下一节我们会实现 render 方法。
