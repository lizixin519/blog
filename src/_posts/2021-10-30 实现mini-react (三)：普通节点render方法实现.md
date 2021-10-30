---
category: 实现 mini-react(三)：普通节点 render 方法实现
tags:
    - react
date: 2021-10-29
title: 实现 mini-react(三)：普通节点 render 方法实现
---

实现 mini-react(三)：普通节点 render 方法实现

<!-- more -->

前一章实现了 createElement 方法, 这一节我们来实现 render 方法。

react 中通过 render 方法将 VirtualDOM 转化成真实 DOM，渲染到页面上。下面我们来实现下 render 方法。

大致思路就是把虚拟 DOM 通过方法转化为真实 DOM 再 append 到指定的 node 节点中。

首先我们需要区分下传入的 virtualDOM 是组件还是普通的 node 节点。不论是类组件还是函数组件，type 类型都是 function。而普通的 node 节点 type 类型则是 string.所以我们可以通过 type 类型来区分组件和普通 node 节点。

```js
// 不论是类组件还是函数组件 type类型都是function
export default function isFunction(virtualDOM) {
    return virtualDOM && typeof virtualDOM.type === 'function';
}
```

先来实现普通节点的情况，此时要考虑该节点是否是文本类型，如果是文本类型的话，则调用`document.createTextNode`方法创建文本节点。如果是普通节点类型，则调用`document.createElement`
我们来定义一个函数来实现转化虚拟 DOM 的功能

```js
//mountElement.js

export default function mountElement(virtualDOM, container) {
    let handleElement = null;
    if (!isFunction(virtualDOM)) {
        handleElement = mountDOMElement(virtualDOM);
    }
    container.appendChild(handleElement);
}
```

```js
//mountDOMElement.js 这个方法之后会复用，所以单独提出来一个函数
export default function mountDOMElement() {
    let handleElement = null;
    // 文本节点
    if (virtualDOM.type === 'text') {
        handleElement = document.createTextNode(virtualDOM.props.textContent);
    } else {
        handleElement = document.createElement(virtualDOM.type);
    }
    // 递归的实现子节点的创建
    virtualDOM.children.forEach((child) => {
        // 调用这个mountElement进行递归，是因为要判断子节点是否是组件。
        mountElement(child, handleElement);
    });
    return handleElement;
}
```

```js
// render.js
// 先不考虑diff
export default function render(virtualDOM, container) {
    // 用来接受真实的dom
    // 最后将节点append到指定的容器中
    mountElement(virtualDOM, container);
}
```

现在我们以及基本实现了 render 方法渲染普通节点元素，此时还有一个问题，就是我们标签的属性并没有添加上，所以我们再新建一个文件，来为元素添加属性。

```js
/**
 * @description: 为元素添加属性
 * @param {*}
 * @return {*}
 */
export default function updateNodeElement(newElement, virtualDOM) {
    const newProps = virtualDOM.props;
    Object.keys(newProps).forEach((propName) => {
        const newPropsValue = newProps[propName];
        // / 判断属性是否是事件属性 例如onClick转化为click,通过addEventListener来进行事件绑定
        if (propName.slice(0, 2) === 'on') {
            const eventName = propName.toLowerCase().slice(2);
            newElement.addEventListener(eventName, newPropsValue);
        } else if (propName === 'value' || propName === 'selected') {
            // 表单元素的属性
            newElement[propName] = newPropsValue;
        } else if (propName !== 'children') {
            if (propName === 'className') {
                newElement.setAttribute('class', newPropsValue);
            } else {
                newElement.setAttribute(propName, newPropsValue);
            }
        }
    });
}
```

至此普通节点的 render 方法基础已经实现，下一节我们将介绍组件的 render 转化。
