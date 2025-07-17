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
			pathPrefix: false
		}
	],
	vite: {
		plugins: [sbgLoader()]
	}
});
