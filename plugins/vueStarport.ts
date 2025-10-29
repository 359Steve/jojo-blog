import { Starport, StarportCarrier } from 'vue-starport';

export default defineNuxtPlugin({
	name: 'vueStarport',
	parallel: true,
	setup(nuxtApp) {
		nuxtApp.vueApp.component('StarportCarrier', StarportCarrier).component('Starport', Starport);
	},
});
