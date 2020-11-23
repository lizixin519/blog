---
category: webpack
tags:
  - webpack
date: 2020-06-15
title: webpack打包library
---

使用webpack打包js library库
<!-- more -->

> 此文使用的是webpack4 

## 安装
第一步首先安装webpack

```shell
npm i webpack webpack-cli -D
```

## 基本配置

新建webpack.config.js文件（此文只做演示，故没有区分环境）

基本配置如下

```javascript
module.exports = {
  mode: 'production', // 此处我们选取选取生产环境
  entry: './index.js',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'xxx',
    libraryTarget: 'umd',
    libraryExport: 'default'
  }
}
```

此处的output为关键，我们要设置libraryTarget为'umd', 这样打出来的包的代码

```javascript
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["friendly"] = factory();
	else
		root["friendly"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
	// 模块代码
});
```
这样可以支持以下几种模式的引用

```javascript
1. import xxx from 'xxx';
2. let xxx = require('xxx');
3. define();
4. <script>标签引入
```

> 注: libraryExport: 'default' 这个属性要设置 不然的话会出现导出的数据外层有一层default


## babel配置

由于我们可能会在编写js library的时候会使用到es6等IE或者版本较低的浏览器的不支持，所以我们需要将这些语法使用babel 来转译成浏览器识别的语法

1. 方案1

我们使用babel-loader 配合babel-polyfill来解决转译问题

* 优点 可以转译es6的新语法以及对象上新增的方法
* 缺点 打包体积过大并且会污染全局变量

因为打包的第三方依赖库，尽管打包体积可以通过按需引入的方式解决，但是污染全局变量，会给项目带来不可预知的问题，故此方案暂不考虑

2. 方案2

使用babel-loader 配合@babel/transfrom-run-time  @babel/preset-env @babel/runtime-corejs2来处理

安装
```shell
npm i babel-loader 配合@babel/transfrom-run-time  @babel/preset-env @babel/runtime-corejs2 -D
```

新建.babelrc文件,配置如下

```json
{
	"presets": [
		[
			"@babel/preset-env",
			{
				"targets": {
					"browsers": [
						"> 1%",
						"last 2 versions",
						"ie >= 8"
					],
					"node": "current"
				},
				"modules": false
			}
		]
	],
	"plugins": [
		["@babel/plugin-transform-runtime", {
			"corejs": 2
		}]
  ]
}

```