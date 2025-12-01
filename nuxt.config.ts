// https://nuxt.com/docs/api/configuration/nuxt-config
import type { MetaObject } from 'nuxt/schema';

const meta: MetaObject = {
	meta: [
		// 基础信息
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ name: 'format-detection', content: 'telephone=no' },
		{ name: 'google-site-verification', content: 'pixBrjqAVBmn9ObEtLR4qdsb7zhOhrW9NcEqKpZrIDw' },
		{ name: 'baidu-site-verification', content: 'codeva-fvEddP22we' },

		// SEO
		{ name: 'description', content: 'Jojo的个人博客，分享技术文章、生活记录和项目经验' },
		{ name: 'keywords', content: 'jojo,博客,技术,前端,Vue,Nuxt,JavaScript,TypeScript,编程' },
		{ name: 'author', content: 'Jojo' },
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
	],
};

export default defineNuxtConfig({
	extends: ['./admin'],
	devtools: { enabled: false },

	// 构建配置
	nitro: {
		preset: 'node-server',
		compressPublicAssets: {
			gzip: true,
			brotli: true,
		},
		minify: true,
		prerender: {
			routes: ['/sitemap.xml', '/robots.txt', '/'],
			crawlLinks: false,
			ignore: ['/admin', '/api'],
		},
		routeRules: {
			'/public/**': { headers: { 'cache-control': 's-maxage=31536000' } },
		},
	},

	routeRules: {
		'/admin/**': { ssr: false },

		// 首页预渲染
		'/': { prerender: true },

		'/photos': {
			isr: 600,
			headers: { 'cache-control': 's-maxage=600' },
		},

		'/blog': { isr: 1800 },
		'/blog/**': { isr: 3600 },

		'/record': { isr: 1800 },
		'/record/**': { isr: 3600 },

		'/api/blog/**': {
			headers: { 'cache-control': 's-maxage=300' },
			cors: true,
		},
		'/api/record/**': {
			headers: { 'cache-control': 's-maxage=600' },
			cors: true,
		},
		'/api/user/**': {
			headers: { 'cache-control': 's-maxage=60' },
			cors: true,
		},
		'/api/**': {
			headers: { 'cache-control': 's-maxage=60' },
			cors: true,
		},

		'/favicon.ico': { headers: { 'cache-control': 's-maxage=31536000' } },
		'/robots.txt': { prerender: true },
		'/sitemap.xml': { prerender: true },
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
		viewTransition: true,
		componentIslands: false,
		typedPages: true,
		asyncContext: true,
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
			meta: meta.meta,
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'dns-prefetch', href: 'https://www.polnareff.me' },
			],
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
		},
		pageTransition: { name: 'page', mode: 'out-in' },
		layoutTransition: { name: 'layout', mode: 'out-in' },
	},

	ssr: true,

	features: {
		inlineStyles: false,
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
			// 启用代码分割
			cssCodeSplit: true,
			// 块大小警告限制
			chunkSizeWarningLimit: 1000,
			// 启用压缩
			minify: 'esbuild',
			// 目标浏览器
			target: 'es2015',
			// 构建输出配置
			rollupOptions: {
				output: {
					// JS 文件命名
					chunkFileNames: '_nuxt/js/[name]-[hash].js',
					entryFileNames: '_nuxt/js/entry-[hash].js',
					// 资源文件命名
					assetFileNames: (assetInfo) => {
						const fileName = assetInfo.names?.[0] || '';

						// CSS 文件
						if (fileName.endsWith('.css')) {
							return '_nuxt/css/[name]-[hash].css';
						}

						// 图片文件
						if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(fileName)) {
							return '_nuxt/images/[name]-[hash][extname]';
						}

						// 字体文件
						if (/\.(woff2?|eot|ttf|otf)$/.test(fileName)) {
							return '_nuxt/fonts/[name]-[hash][extname]';
						}

						// 媒体文件
						if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(fileName)) {
							return '_nuxt/media/[name]-[hash][extname]';
						}

						// 其他文件
						return '_nuxt/assets/[name]-[hash][extname]';
					},
				},
			},
			// 压缩选项
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
		},
		// 开发服务器优化
		server: {
			hmr: {
				port: 24678,
			},
		},
		// 优化依赖预构建
		optimizeDeps: {
			include: [
				'vue',
				'@vue/runtime-core',
				'@vue/runtime-dom',
				'element-plus',
				'@vueuse/core',
				'@vueuse/motion',
				'@iconify/vue',
				'pinia',
				'vue-starport',
				'animate.css',
			],
			exclude: ['@prisma/client', 'mysql2', 'nodemailer', 'three'],
		},
	},

	elementPlus: {
		importStyle: 'css',
	},

	// 字体优化
	googleFonts: {
		families: {},
		display: 'swap',
		prefetch: false,
		preconnect: false,
		preload: false,
		download: true,
		base64: false,
	},

	postcss: {
		plugins: {
			'postcss-nested': {},
			'postcss-custom-media': {},
			...(process.env.NODE_ENV === 'production'
				? {
					cssnano: {
						preset: [
							'default',
							{
								discardComments: { removeAll: true },
								normalizeWhitespace: true,
								mergeRules: true,
								mergeLonghand: false,
								discardUnused: false,
							},
						],
					},
				}
				: {}),
		},
	},
});
