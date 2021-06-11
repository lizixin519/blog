---
category: rollup
tags:
  - rollup
date: 2021-06-10
title: rollup打包react组件
---


rollup打包react组件
<!-- more -->

## 1. 为什么选用rollup

相较于webpack，rollup可以打出esmodule的包，能更好的支持tree-shaking,而webpack打出的umd格式的包体积略大，但是项目如果有特别复杂的图片以及一些require路径，则用rollup可能配置起来会很麻烦,这时建议使用webpack。
总的来说，还是根据业务需求来确定打包工具的使用。

## 2. rollup基本概念

### 2.1. 入口

rollup和webpack一样，会从入口文件开始进行依赖分析，然后进行打包构建

```js
// rollup.config.js
export default {
    input: './src/index'
}
```

### 2.2. 出口

指定rollup构建完成之后的目录，

```js
// rollup.config.js
export default {
    input: './src/index.js',
    output: {
        // 打包完成之后结果要写入的文件
        file: 'bundle.js',
        // 生成包的格式
        format: 'esm',
        // 变量名 代表你的 iife/umd 包
        name: 'myBundle'
    }
}
```

其中format支持常用的几种包格式,一下是几种常用的包格式

* amd – 异步模块定义，用于像RequireJS这样的模块加载器
* cjs – CommonJS，适用于 Node 和 Browserify/Webpack
* esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 `<script type=module>` 标签引入
* iife – 一个自动执行的功能，适合作为`<script>`标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
* umd – 通用模块定义，以amd，cjs 和 iife 为一体

### 2.3. external

打包时不将三方包打进包中，而是继续以引用的方式存在

```js
export default {
    input: './src/index.js',
    output: {
        // 打包完成之后结果要写入的文件
        file: 'bundle.js',
        // 生成包的格式
        format: 'esm',
        // 变量名 代表你的 iife/umd 包
        name: 'myBundle'
    },
    external: ['react', 'loadsh']
}
```

### 2.4. plugin

插件对象是一个数组，比如处理json文件的插件@rollup/plugin-json

```js
import json from '@rollup/plugin-json';

export default {
    input: './src/index.js',
    output: {
        // 打包完成之后结果要写入的文件
        file: 'bundle.js',
        // 生成包的格式
        format: 'esm',
        // 变量名 代表你的 iife/umd 包
        name: 'myBundle'
    },
    external: ['react', 'loadsh'],
    plugin: [
        json()
    ]
}
```

## 3. react组件库打包

react项目使用jsx语法，以及需要将es6转化为es5代码，需要配置babel.编译出cjs,以及esm格式的包。

> 注意：此处打包格式为esm以及cjs,需在package.json中对应main(cjs格式)，module(esm格式)字段

### 3.1. rollup.config.json配置

```js
// rollup.config.js
import path from 'path';
// babel 转化代码
import babel from '@rollup/plugin-babel';
// 解决node_modules三方包找不到问题
import resolve from '@rollup/plugin-node-resolve';
// 解析cjs格式的包
import commonjs from '@rollup/plugin-commonjs';
// 处理样式文件
import postcss from 'rollup-plugin-postcss';
// 显示包的大小
import filesize from 'rollup-plugin-filesize';
// 解决node api使用问题
import builtins from 'rollup-plugin-node-builtins';
// 处理image图片为base64
import image from '@rollup/plugin-image';
// css加前缀
import autoprefixer from 'autoprefixer';
// 处理将文件作为数据或者es模块导入
import url from '@rollup/plugin-url';
// ts编译插件
import typescript from 'rollup-plugin-typescript2';
// 压缩代码
import { terser } from 'rollup-plugin-terser';
// 处理json问题
import json from '@rollup/plugin-json';
// 配置别名
import alias from '@rollup/plugin-alias';
// 拷贝文件
import copy from 'rollup-plugin-copy';
// 打包前删除原有目录
import del from 'rollup-plugin-delete';

import pkg from './package.json';
const getPath = (_path) => path.resolve(__dirname, _path);

export default {
    input: './src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'esm',
        },
    ],
    context: 'window',
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
        del(),
        builtins(),
        json(),
        url(),
        image(),
        postcss({
            extensions: ['.css', '.less'],
            use: [
                [
                    'less',
                    {
                        javascriptEnabled: true,
                    },
                ],
            ],
            extract: false,
            plugins: [autoprefixer],
        }),
        alias({
            entries: {
                src: './src',
            },
        }),
        typescript({
            tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
            extensions: ['.ts', 'tsx'],
        }),
        babel({
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
        }),
        resolve(),
        commonjs(),
        terser(),
        copy({
            targets: [{ src: 'src/public', dest: 'dist/' }],
        }),
        filesize(),
    ],
};

```

### 3.2. babel配置

react组件需要编译jsx语法，以及es6语法, .babelrc文件配置如下

```json
{
    "env": {
        "test": {
            "presets": ["@babel/preset-env", "@babel/preset-react"]
        }
    },
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false
            }
        ],
        "@babel/preset-react"
    ],
    "ignore": ["node_modules/**"],
    "plugins": ["@babel/plugin-transform-runtime", ["@babel/plugin-proposal-class-properties", { "loose": true }], ["@babel/plugin-proposal-private-methods", { "loose": true }]]
}

```

## 4. 遇到的问题

### 4.1. 编译es6代码失效的问题

由于没注意tsconfig中的target为esnext,导致es6代码未编译，组件引入报错

```js
Missing class properties transform
```

### 4.2. iconfont require文件不打包问题

由于解析不到require路径问题，此处暂用copy文件的方式将文件拷贝到dist文件中，使用rollup-plugin-copy插件
