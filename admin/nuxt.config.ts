import sbgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
	typescript: {
		strict: true,
	},
	compatibilityDate: '2024-11-01',
	devtools: { enabled: false },
	components: [
		{
			path: './components',
			pathPrefix: false,
			extensions: ['.vue', '.tsx'],
		},
	],
	plugins: ['~/admin/plugins/chart.ts'],
	vite: {
		plugins: [sbgLoader()],
	},
	router: {
		options: {
			hashMode: false,
		},
	},
	imports: {
		dirs: [
			'composables',
			'composables/api/tag',
			'composables/api/user',
			'composables/api/blog',
			'composables/api/md',
			'composables/api/record',
			'composables/api/error',
			'composables/api/statistical',
		],
	},
});
