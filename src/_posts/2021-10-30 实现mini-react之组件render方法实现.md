---
category: 实现 mini-react(四)：组件 render 方法实现
tags:
    - mini-react
date: 2021-10-29
title: 实现 mini-react(四)：组件 render 方法实现
---

实现 mini-react(四)：组件 render 方法实现

<!-- more -->

上一章已经把普通节点的 render 方法实现了，下面我们来实现组件的 render 方法。

我们介绍过了，通过 virtualDOM 的 type 类型来判断是否是组件形式。组件又分为 class 组件以及函数组件，他们之间的区别可以通过，组件构造函数的原型上是否有 render 方法来判断。所以我们来实现一个函数,来判断组件类型

```js
export default function isFunctionComponent(virtualDOM) {
    const type = virtualDOM && virtualDOM.type;
    return type && isFunction(type) && !(type.prototype && type.prototype.render);
}
```

然后我们新增两个文件对之前的结构做下修改

```js
// mountNativeElement
// 对普通node节点做处理
import createDOMElement from './createDOMElement';

export default function mountNativeElement(virtualDOM, container) {
    let newElement = createDOMElement(virtualDOM);
    container.appendChild(newElement);
}
```

```js
// mountComponent.js
// 对组件进行处理
export default function mountNativeElement(virtualDOM, container) {}
```

之前的`mountElement.js`做以下修改

```js
export default function mountElement(virtualDOM, container) {
    if (isFunction(virtualDOM)) {
        mountComponent(virtualDOM, container);
    } else {
        mountNativeElement(virtualDOM, container);
    }
}
```

现在我们开始实现 mountNativeElement 里的功能。

```js
export default function mountComponent(virtualDOM, container) {
    let handleVirtualDOM = null;
    if (isFunctionComponent(virtualDOM)) {
        handleVirtualDOM = buildFunctionComponent(virtualDOM);
    } else {
        handleVirtualDOM = buildClassComponent(virtualDOM);
    }
    if (isFunction(handleVirtualDOM)) {
        mountComponent(handleVirtualDOM, container);
    } else {
        mountNativeElement(handleVirtualDOM, container);
    }
    return handleVirtualDOM;
}

function buildFunctionComponent(virtualDOM) {
    return virtualDOM.type();
}

function buildClassComponent(virtualDOM) {
    const component = new virtualDOM.type();
    return component;
}
```

我们通过 virtualDOM 的 type 方法执行来获取虚拟 DOM 来进行处理，因为会存在子节点也是组件的清空，所以这块需要做下递归处理。如果为普通节点则调用处理普通节点的方法`mountNativeElement`

此时还有几个问题

1. 项目中还未实现 class 类组件
2. 组件的 props 并未传递过来

针对问题 1 我们来实现一个简单的 class

```js
// component.js
export default class Component {
    constructor(props) {
        this.props = props;
    }
}
```

针对问题 2 其实很简单我们在执行`virtualDOM.type`方法的时候将 props 传入进去即可，修改`mountComponent.js`中的两个函数如下，

```js
function buildFunctionComponent(virtualDom) {
    return virtualDom.type(virtualDom.props || {});
}

function buildClassComponent(virtualDom) {
    const component = new virtualDom.type(virtualDom.props || {});
    return component.render();
}
```

现在我们实现了组件的 render 方法，下一章我们将介绍 diff 算法的实现。
