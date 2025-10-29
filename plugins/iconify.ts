import ri from '@iconify-json/ri/icons.json';
import { Icon, addCollection } from '@iconify/vue';

export default defineNuxtPlugin({
	name: 'iconify',
	parallel: true,
	setup(nuxtApp) {
		nuxtApp.vueApp.component('Icon', Icon);
		addCollection(ri);
	},
});
