import { Starport, StarportCarrier } from 'vue-starport'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.component('StarportCarrier', StarportCarrier).component('Starport', Starport)
})
