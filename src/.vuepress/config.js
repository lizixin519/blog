module.exports = {
	title: '李紫鑫',
	description: '懒是第一生产力',
	head: [
		['link', { rel: 'icon', href: '/assest/image/photo.jpeg' }]
	],
	theme: 'meteorlxy',
	themeConfig: {
		personalInfo: {
			nickname: '李紫鑫',
			description: '信奉自由',
			email: 'lizixin519@163.com',
			location: 'beijing, China',
			avatar: '/assest/image/photo.jpeg',
			sns: {
				github: {
					account: 'lizixin',
					link: 'https://github.com/lizixin519',
				}
			}
		},
		header: {
			background: {
				useGeo: true
			}
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
			}
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
		comments: false
	}
}