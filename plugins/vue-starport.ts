import { StarportCarrier, Starport } from 'vue-starport'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('StarportCarrier', StarportCarrier).component('Starport', Starport)
})