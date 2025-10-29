import { MdCatalog, MdEditor, MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default defineNuxtPlugin({
	name: 'mdEditor',
	parallel: true,
	setup(nuxtApp) {
		nuxtApp.vueApp
			.component('MdEditor', MdEditor)
			.component('MdPreview', MdPreview)
			.component('MdCatalog', MdCatalog);
	},
});
