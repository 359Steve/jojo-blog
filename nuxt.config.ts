// https://nuxt.com/docs/api/configuration/nuxt-config
interface Meta {
  charset?: string
  name?: string
  content?: string
  hid?: string
  [key: string]: any
}

const meta: Meta[] = [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  { name: 'format-detection', content: 'telephone=no' },
  { hid: 'keywords', name: 'keywords', content: 'nuxt3' }
]

export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate'],

  // app配置
  app: {
    head: {
      title: 'jojo-blog',
      meta,
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/my.ico' }]
    }
  },

  // 初始化样式
  css: ['~/assets/css/index.scss'],

  // 定义公共样式
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       scss: {
  //         additionalData: '@use "~/assets/css/index.scss" as *;'
  //       }
  //     }
  //   }
  // }

})
