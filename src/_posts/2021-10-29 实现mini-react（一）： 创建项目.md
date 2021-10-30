---
category: 实现 mini-react(一)：创建项目
tags:
    - react
date: 2021-10-29
title: 实现 mini-react(一)：创建项目
---

实现 mini-react(一)：创建项目

<!-- more -->

为了加深对 react 理解，实现一个 mini-react。

### 1. 创建 mini-react 项目

项目模版已创建在 github 上需要自取,[mini-react-template](https://github.com/lizixin519/mini-react-template)。

-   webpack 配置
    项目需要调试以及使用 babel 转译，所以我们需用 webpack 的 dev-server 来启动项目，大概配置如下

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./dist'],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    devServer: {
        contentBase: './dist',
        compress: false,
        host: 'localhost',
        port: 5000,
    },
};
```

-   babel 配置

jsx 语法需要借助 babel 进行转译,babel-react 插件默认提供的转译方式为 React.createElement,我们需要做以下修改,后续会实现 createElement 方法

```
{
    "presets": [
        "@babel/preset-env",
        [
            "@babel/preset-react",
            {
                "pragma": "MiniReact.createElement"
            }
        ]
    ]
}
```
