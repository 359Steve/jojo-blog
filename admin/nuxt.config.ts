import sbgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
	typescript: {
		strict: true
	},
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	components: [
		{
			path: './components',
			pathPrefix: false,
			extensions: ['.vue', '.tsx']
		}
	],
	vite: {
		plugins: [sbgLoader()]
	},
	imports: {
		dirs: [
			'composables',
			'composables/api/tag',
			'composables/api/user'
		]
	}
});
