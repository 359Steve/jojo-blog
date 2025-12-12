// nuxt.config.ts
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
	ssr: true,
	pages: true,
	typescript: { strict: true },

	// App 配置
	app: {
		head: {
			meta: meta.meta,
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'shortcut icon', href: '/favicon.ico' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'dns-prefetch', href: 'https://www.polnareff.me' },
			],
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
		},
	},

	build: {
		transpile: [/echarts/],
	},

	// 组件自动导入
	components: [
		{ path: '~/components', extensions: ['.vue', '.tsx'] },
		{ path: '~/admin/components', pathPrefix: false, extensions: ['.vue', '.tsx'] },
	],

	// 运行时配置
	runtimeConfig: {
		public: {
			siteUrl: 'https://www.polnareff.me',
			siteName: 'Jojo Blog',
			jwtSecret: 'jojo-blog',
			accessTokenExpiresIn: '7d',
			expiresin: 604800,
			email: {
				host: '2075313210@qq.com',
				port: 465,
				secure: true,
				auth: { user: '2075313210@qq.com', pass: 'uudttqgftlgvfdeb' },
			},
		},
	},

	// Nitro 配置
	nitro: {
		preset: 'node-server',
		compressPublicAssets: { gzip: true, brotli: true },
		minify: true,
		prerender: {
			routes: [],
			crawlLinks: false,
			ignore: ['/admin', '/api'],
		},
		experimental: { wasm: false },
		routeRules: {
			'/public/**': { headers: { 'cache-control': 's-maxage=31536000' } },
		},
	},

	// 路由规则
	routeRules: {
		'/admin/**': { ssr: false } as any,
		'/': { swr: 300 },
		'/photos': { swr: 600, headers: { 'cache-control': 's-maxage=600' } },
		'/blog': { swr: 1800 },
		'/blog/**': { swr: 3600 },
		'/record': { swr: 1800 },
		'/record/**': { swr: 3600 },
		'/api/blog/**': { headers: { 'cache-control': 's-maxage=300' }, cors: true },
		'/api/record/**': { headers: { 'cache-control': 's-maxage=600' }, cors: true },
		'/api/user/**': { headers: { 'cache-control': 's-maxage=60' }, cors: true },
		'/favicon.ico': { headers: { 'cache-control': 's-maxage=31536000' } },
	},
	// CSS
	css: [
		'~/assets/css/index.scss',
		'~/assets/css/tailwind.css',
		'animate.css/animate.min.css',
		'remixicon/fonts/remixicon.css',
	],

	// Vite 构建
	vite: {
		css: {
			preprocessorOptions: {
				scss: { additionalData: '@use "~/assets/css/element-variables.scss" as element;' },
			},
			preprocessorMaxWorkers: true,
		},
		build: {
			cssCodeSplit: true,
			chunkSizeWarningLimit: 1000,
			minify: 'esbuild',
			target: 'es2015',
			rollupOptions: {
				output: {
					chunkFileNames: '_nuxt/js/[name]-[hash].js',
					entryFileNames: '_nuxt/js/entry-[hash].js',
					assetFileNames: (assetInfo) => {
						const names = assetInfo.names || [''];
						const name = names[0];
						if (name.endsWith('.css')) return '_nuxt/css/[name]-[hash].css';
						if (/\.(png|jpe?g|gif|svg|webp|avif)$/.test(name)) return '_nuxt/images/[name]-[hash][extname]';
						if (/\.(woff2?|eot|ttf|otf)$/.test(name)) return '_nuxt/fonts/[name]-[hash][extname]';
						if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(name))
							return '_nuxt/media/[name]-[hash][extname]';
						return '_nuxt/assets/[name]-[hash][extname]';
					},
					manualChunks: {
						'vue-vendor': ['vue', 'vue-router', 'pinia', 'vue-starport'],
						'element-plus': ['element-plus'],
						echarts: ['echarts'],
						iconify: ['@iconify/vue'],
						vueuse: ['@vueuse/core', '@vueuse/motion'],
					},
				},
			},
			terserOptions: { compress: { drop_console: true, drop_debugger: true } },
		},
		server: { hmr: { port: 24678 } },
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
			],
			exclude: ['@prisma/client', 'mysql2', 'nodemailer', 'three'],
		},
	},

	elementPlus: { importStyle: 'css' },

	colorMode: {
		classSuffix: '',
		storageKey: 'nuxt-color-mode',
		preference: 'system',
		fallback: 'light',
	},

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
		'@nuxtjs/sitemap',
		'@nuxt/content',
	],

	content: {
		build: {
			markdown: {
				toc: {
					depth: 2,
					searchDepth: 2,
				},
				contentHeading: true,
				highlight: {
					theme: {
						default: 'github-light',
						dark: 'github-dark',
						sepia: 'monokai',
					},
				},
			},
		},
		renderer: {
			alias: {
				p: 'text-style',
			},
		},
	},

	site: {
		url: 'https://www.polnareff.me',
		name: 'Jojo Blog',
		description: 'Jojo的个人博客，分享技术文章、生活记录和项目经验',
		defaultLocale: 'zh',
	},

	sitemap: {
		exclude: ['/admin/**', '/api/**'],
		sources: ['/api/sitemap/urls'],
		defaults: {
			changefreq: 'weekly',
			priority: 0.5,
			lastmod: new Date(),
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
		'~/plugins/getUser.ts',
		'~/plugins/azyload.ts',
		'~/plugins/iconify.ts',
		'~/plugins/mdEditor.ts',
		'~/plugins/vueStarport.ts',
		'~/plugins/weather.client.ts',
		'~/plugins/preventDefault.client.ts',
	],

	googleFonts: {
		families: {
			'Roboto+Slab': [400, 700],
			Lato: [400, 700, 900],
			'Fira+Code': [400, 700],
		},
		display: 'swap',
		prefetch: false,
		preconnect: false,
		preload: false,
		download: false,
		base64: false,
	},

	postcss: {
		plugins: {
			'postcss-nested': {},
			'postcss-custom-media': {},
			...(process.env.NODE_ENV === 'production'
				? {
					cssnano: {
						preset: ['default', { discardComments: { removeAll: true }, normalizeWhitespace: true }],
					},
				}
				: {}),
		},
	},
});
