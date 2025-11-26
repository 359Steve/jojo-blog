// https://nuxt.com/docs/api/configuration/nuxt-config

const meta: Meta[] = [
	// 基础信息
	{ charset: 'utf-8' },
	{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
	{ name: 'format-detection', content: 'telephone=no' },
	{ name: 'google-site-verification', content: 'pixBrjqAVBmn9ObEtLR4qdsb7zhOhrW9NcEqKpZrIDw' },

	// SEO
	{ hid: 'description', name: 'description', content: 'Jojo的个人博客，分享技术文章、生活记录和项目经验' },
	{ hid: 'keywords', name: 'keywords', content: 'jojo,博客,技术,前端,Vue,Nuxt,JavaScript,TypeScript,编程' },
	{ hid: 'author', name: 'author', content: 'Jojo' },
	{ name: 'robots', content: 'index,follow' },

	// Open Graph
	{ property: 'og:type', content: 'website' },
	{ property: 'og:title', content: 'Jojo Blog - 个人博客' },
	{ property: 'og:description', content: 'Jojo的个人博客，分享技术文章、生活记录和项目经验' },
	{ property: 'og:site_name', content: 'Jojo Blog' },
	{ property: 'og:image', content: '/logo.svg' },
	{ property: 'og:url', content: 'https://www.polnareff.me' },

	// 微信、QQ、微博
	{ property: 'weibo:title', content: 'Jojo Blog - 个人博客' },
	{ property: 'weibo:description', content: 'Jojo的个人博客，分享技术文章、生活记录和项目经验' },
	{ property: 'weibo:image', content: '/logo.svg' },
	{ property: 'wechat:title', content: 'Jojo Blog - 个人博客' },
	{ property: 'wechat:description', content: 'Jojo的个人博客，分享技术文章、生活记录和项目经验' },
	{ property: 'wechat:image', content: '/logo.svg' },
];

export default defineNuxtConfig({
	extends: ['./admin'],
	devtools: { enabled: false },
	routeRules: {
		'/admin/**': {
			ssr: false,
		},
	},
	components: [
		{
			path: '~/components',
			extensions: ['.vue', '.tsx'],
		},
		{
			path: '~/admin/components',
			pathPrefix: false,
			extensions: ['.vue', '.tsx'],
		},
	],
	runtimeConfig: {
		public: {
			siteUrl: 'https://www.polnareff.me',
			siteName: 'Jojo Blog',
			jwtSecret: 'jojo-blog',
			accessTokenExpiresIn: '7d',
			expiresin: 604800,
			// 配置邮件服务
			email: {
				host: '2075313210@qq.com',
				port: 465,
				secure: true,
				auth: {
					user: '2075313210@qq.com',
					pass: 'uudttqgftlgvfdeb',
				},
			},
		},
	},
	experimental: {
		payloadExtraction: false,
	},
	imports: {
		dirs: [
			'composables',
			'composables/api/user',
			'composables/api/blog',
			'composables/blog',
			'composables/user',
			'composables/api/record',
			'composables/api/error',
		],
	},
	plugins: [
		'~/plugins/vueStarport.ts',
		'~/plugins/iconify.ts',
		'~/plugins/mdEditor.ts',
		'~/plugins/getUser.ts',
		'~/plugins/weather.client.ts',
		'~/plugins/preventDefault.client.ts',
	],
	pages: true,
	typescript: {
		strict: true,
		tsConfig: {
			compilerOptions: {
				experimentalDecorators: true,
				emitDecoratorMetadata: true,
			},
		},
	},
	compatibilityDate: '2024-11-01',
	modules: [
		'@nuxtjs/tailwindcss',
		'@element-plus/nuxt',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate',
		'@vueuse/nuxt',
		'@nuxtjs/color-mode',
		'@vueuse/motion/nuxt',
		'@nuxtjs/google-fonts',
		'@nuxt/eslint',
	],

	colorMode: {
		classSuffix: '',
		storageKey: 'nuxt-color-mode',
		preference: 'system',
		fallback: 'light',
	},
	// 项目配置
	app: {
		head: {
			title: 'JoJo-Blog',
			meta,
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
			],
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
		},
	},

	// 初始化样式
	css: [
		'~/assets/css/index.scss',
		'~/assets/css/tailwind.css',
		'animate.css/animate.min.css',
		'remixicon/fonts/remixicon.css',
	],

	// 定义公共样式
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/css/element-variables.scss" as element;',
				},
			},
			preprocessorMaxWorkers: true,
		},
		build: {
			cssCodeSplit: false,
		},
	},

	elementPlus: {
		importStyle: 'css',
	},

	postcss: {
		plugins: {
			'postcss-nested': {},
			'postcss-custom-media': {},
		},
	},
});
