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
  pages: true,
  typescript: {
    strict: true
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt', '@pinia/nuxt', 'pinia-plugin-persistedstate', '@vueuse/nuxt', '@nuxtjs/color-mode'],

  colorMode: {
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
    preference: 'system',
    fallback: 'light',
  },
  // app配置
  app: {
    head: {
      title: 'jojo-blog',
      meta,
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }]
    }
  },

  // 初始化样式
  css: ['~/assets/css/index.scss', '~/assets/css/tailwind.scss'],

  // 定义公共样式
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/element-variables.scss" as element;'
        }
      }
    }
  },

  elementPlus: {
    importStyle: 'scss'
  }

})
