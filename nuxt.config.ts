// https://nuxt.com/docs/api/configuration/nuxt-config

const meta: Meta[] = [
	{ charset: 'utf-8' },
	{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
	{ name: 'format-detection', content: 'telephone=no' },
	{ hid: 'keywords', name: 'keywords', content: 'nuxt3' },
];

export default defineNuxtConfig({
	extends: ['./admin'],
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
			jwtSecret: 'jojo-blog',
			accessTokenExpiresIn: '7d',
			expiresin: 604800,
		},
	},
	experimental: {
		payloadExtraction: false,
	},
	imports: {
		dirs: ['composables'],
	},
	plugins: [
		'~/plugins/vue-starport.ts',
		'~/plugins/iconify.ts',
		'~/plugins/md-editor.ts',
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
	devtools: { enabled: true },
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
			title: 'jojo-blog',
			meta,
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }],
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
		},
	},

	// 初始化样式
	css: [
		'~/assets/css/index.scss',
		'~/assets/css/tailwind.css',
		'~/assets/css/index.scss',
		'animate.css/animate.min.css',
		'remixicon/fonts/remixicon.css',
	],

	// googleFonts: {
	// 	families: {
	// 		'Zhi Mang Xing': true
	// 	},
	// 	download: true,
	// 	base64: false,
	// 	overwriting: true,
	// 	outputDir: 'assets/fonts'
	// },

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
	},

	elementPlus: {
		importStyle: 'scss',
	},

	postcss: {
		plugins: {
			'postcss-nested': {},
			'postcss-custom-media': {},
		},
	},
});
