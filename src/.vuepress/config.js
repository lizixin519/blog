module.exports = {
    title: '李紫鑫',
    description: '懒是第一生产力',
    head: [
        ['link', { rel: 'icon', href: '/assest/image/logo.png' }],
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, minimal-ui' }],
    ],
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom',
        [
            'sitemap',
            {
                hostname: 'https://lizixin519.github.io',
            },
        ],
        [
            '@vssue/vuepress-plugin-vssue',
            {
                platform: 'github', //v3的platform是github，v4的是github-v4
                locale: 'zh', //语言
                // 其他的 Vssue 配置
                owner: 'lizixin519', //github账户名
                repo: 'blog', //github一个项目的名称
                clientId: '6cb833afa3ebf684fca9', //注册的Client ID
                clientSecret: 'f92b62afc57c0444e6e54fa92978d49c30d2853f', //注册的Client Secret
                autoCreateIssue: true, // 自动创建评论，默认是false，最好开启，这样首次进入页面的时候就不用去点击创建评论的按钮了。
            },
        ],
        [
            'copyright',
            {
                noCopy: true, // 选中的文字将无法被复制
                minLength: 100, // 如果长度超过 100 个字符
            },
        ],
        'vuepress-plugin-baidu-autopush',
        ['vuepress-plugin-code-copy', true],
    ],
    theme: 'meteorlxy',
    themeConfig: {
        personalInfo: {
            nickname: '李紫鑫',
            description: '信奉自由',
            email: 'lizixin519@163.com',
            location: 'beijing, China',
            avatar: '/assest/image/logo.png',
            sns: {
                github: {
                    account: 'lizixin',
                    link: 'https://github.com/lizixin519',
                },
                juejin: {
                    account: 'lizixin',
                    link: 'https://juejin.im/user/254742430757645',
                },
            },
        },
        header: {
            background: {
                useGeo: true,
            },
        },
        footer: {
            poweredBy: false,
            // 是否显示使用的主题
            poweredByTheme: false,
            // 添加自定义 footer (支持 HTML)
            custom: 'Copyright 2020-present <a href="https://github.com/lizixin519" target="_blank">lizixin</a> | MIT License',
        },
        infoCard: {
            // 卡片 header 的背景，可以使用图片，或者随机变化的图案（geopattern）
            headerBackground: {
                // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为空白背景
                useGeo: true,
            },
        },
        nav: [
            { text: '首页', link: '/', exact: true },
            { text: '文章', link: '/posts/', exact: false },
        ],
        lang: 'zh-CN',
        lastUpdated: true,
        smoothScroll: true,
        pagination: {
            perPage: 5,
        },
        defaultPages: {
            // 是否允许主题自动添加 Home 页面 (url: /)
            home: true,
            // 是否允许主题自动添加 Posts 页面 (url: /posts/)
            posts: true,
        },
        // comments: true,
        // plugins: [
        // 	// ['@vssue/vuepress-plugin-vssue', {
        // 	// 		// 设置 `platform` 而不是 `api`
        // 	// 		platform: 'github',
        // 	// 		// 其他的 Vssue 配置，里面的值
        // 	// 		owner: 'lizixin519',
        // 	// 		repo: 'https://github.com/lizixin519/lizixin519.github.io',
        // 	// 		clientId: '6cb833afa3ebf684fca9',
        // 	// 		clientSecret: '8367c385fef538bdbfe0d06430dbd8b93ff0e61c'
        // 	// }],
        // 	['vuepress-plugin-baidu-autopush'],
        // 	['vuepress-plugin-code-copy', true],
        // 	['@vuepress/back-to-top'],
        // 	['@vuepress/medium-zoom'],
        // 	['copyright', {
        //     noCopy: true, // 选中的文字将无法被复制
        //     minLength: 100, // 如果长度超过 100 个字符
        //   }]
        // ]
    },
};
