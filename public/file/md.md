## 参数配置

#### 全局变量定义，在nuxt.config.ts中配置，需要在构建后使用环境变量指定的私有或公共令牌
```javascript
runtimeConfig: {
    // 只在服务端可用
    count: 123,

    // 服务端和客户端都可用
    public: {
        myName: 'John Doe'
    }
}
```



#### app.config.ts中配置，在构建时确定的公共令牌，网站配置（如主题变体、标题）以及不敏感的项目配置等
```javascript
export default defineAppConfig({
    title: 'Nuxt App',
    info: {
        id: 1
    }
})
```



#### 添加类型标注，在根目录中创建types/run-time.d.ts
```javascript
import { RuntimeConfig } from '@nuxt/schema'

declare module '@nuxt/schema' {
    interface RuntimeConfig extends RuntimeConfig {
        count: number
    }

    interface PublicRuntimeConfig {
        myName: string
    }
}

// 在扩展类型时，确保导入或导出至少一个东西非常重要
export {}
```



#### 添加类型标注，请在根目录中创建types/app-config.d.ts
```javascript
declare module 'nuxt/schema' {
  interface AppConfig {
    // 这会完全替换已有的 `theme` 属性的推断类型
    theme: {
      // 你可能想为此值指定更具体的类型，比如字符串字面量类型
      primaryColor?: 'red' | 'blue'
    }
  }
  interface AppConfigInput {
    /** 主题配置 */
    theme?: {
      /** 主应用颜色 */
      primaryColor?: string
    }
  }
}

// 为了增强类型时总是确保导入或导出某个内容
export {}
```



#### 本地环境变量定义，请在本地.env文件中配置
```javascript
VUE_APP_COUNT=123
VUE_APP_MY_NAME=John Doe
```



#### 外部插件引入，在nuxt.config.ts中配置
```javascript
modules: [
    [
        '@element-plus/nuxt'
    ]
]
```



#### css样式文件引入，请在nuxt.config.ts中配置
```javascript
css: ['~/assets/css/index.scss']
```
```javascript
vite: {
    css: {
        preprocessorOptions: {
        scss: {
            additionalData: '@use "~/assets/css/page.scss" as *;'
        }
        }
    }
}
```



#### 区分环境，在服务端还是在客户端
```javascript
if (import.meta.server) {
  console.log(config.count);
} else {
  console.log(config.public.myName);
}
```



#### 基本路由配置，在根目录中创建pages/index.vue
```text
1. pages目录下的index.vue就是根路由/
2. 其它基本路由页面只需要在pages目录下创建即可
```



#### 命名路由配置，例如在根目录中创建pages/user/[id].vue
```text
1. 此时访问路径必须是：/user/123，这个123是动态路由参数
```



#### 可选路由配置，例如在根目录中创建pages/[[test]]/myTest.vue
```text
1. 此时访问路径是：/test/myTest或者/myTest
```



#### 全局路由配置，例如在根目录中创建pages/[...404].vue，其中名称是任意的
```text
1. 当所有路由都匹配不到时，会自动跳转到404路由
```



#### 嵌套路由配置，例如在根目录中创建pages/user/userIndex.vue
```text
1. 目标效果是在user页面中显示子页面，需要在pages目录下创建与user同名的vue文件，在这个vue文件中使用NuxtPage标签即可
2. 之前user/[id]的路由，依然可以访问，但现在的效果是在user页面中显示子页面
```



#### 编程式路由
```javascript
// 该方法只在客户端可用
const router = useRouter();
router.push({ path: '/user/123' });

// 该方法客户端和服务端都可用
if (import.meta.server) {
    navigateTo('/user/2075313210');
}
```



#### 中间件（服务端和客户端都可用），路由守卫
```javascript
// 创建路由中间件
// 在根目录中创建middleware/router.ts
export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/about') {
        return navigateTo('/user/666666')
    }
})

// 应用中间件
// 在对应路由页面中添加definePageMeta
definePageMeta({
  middleware: ['router'] // 这个router就是在middleware目录中创建的router.ts中间件
})
```



#### 全局中间件，在根目录中创建middleware/index.global.ts
```javascript
// 所有页面都会执行
export default defineNuxtRouteMiddleware((to, from) => {
    console.log(to.path)
    if (to.path === '/about') {
        return navigateTo('/user/666666')
    }
})

// 验证token
export default defineNuxtRouteMiddleware((to, from) => {
    const paths: string[] = ['/', '/about', '/login']

    if (!paths.includes(to.path)) {
        let token: string = ''

        if (import.meta.client) {
            token = localStorage.getItem('token') || ''
        }

        if (!token) {
            const query: Record<string, string | number> = {
                code: 401,
                message: '请先登录'
            }
            return navigateTo({
                path: '/login',
                query
            })
        }
    }
})
```



#### composables目录下导出的方法不需要导入，utils差不多
```javascript
export const myFun = () => {
    console.log('myFun')
}
```



#### components目录下定义的全局组件会自动注册
```javascript
<MyHeader></MyHeader>
```



#### $fetch请求用于获取数据
```javascript
// 基本用法
const data = await $fetch('https://api.example.com/data')
// 定义携带参数类型和返回参数类型
async function typedFetch<Res, Req = any>(
    url: string,
    options?: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
        body?: Req
        query?: Req,
        params?: Req
    }
): Promise<Res> {
    return $fetch<Res>(url, options as any)
}
// 只在服务端时运行
if (import.meta.server) {
    const res = await $fetch('https://jsonplaceholder.typicode.com/posts')
    console.log(res)
}
```



#### useAsyncData用于获取数据
```javascript
// 使用如下方法会导致在服务端执行了，但是客户端不会执行，如果有变量赋值的话在客户端时没有效果
if (import.meta.server) {
    const res = await $fetch('https://jsonplaceholder.typicode.com/posts')
    dataArr.value = res.data
}
// 这时就要用到useAsyncData，返回的数据需要res.data.value拿到此时的数据是响应式的
let res = await useAsyncData('data', async () => {
    // $fetch此时加不加await都是一样的
    return $fetch('https://jsonplaceholder.typicode.com/posts')
})
if (res.data.value?.code === 20041) {
    dataArr.splice(0, dataArr.length, ...res.data.value?.data.records)
}
// 这里useAsyncData里面的key（data）是唯一的，nuxt根据这个key来实现只请求一次但是服务端和客户端都有效
```



#### useFetch用于获取数据是$fetch和useAsyncData的语法糖
> 参考文档：https://nuxt.com.cn/docs/api/composables/use-fetch
```javascript
const res = await useFetch<NetWorkRes, { currentpage: number, pageSize: number }>(`${config.public.NUXT_BASE_URL + config.public.NUXT_QUERYALL_URL}`, {
    method: 'GET',
    params: {
        currentpage: 1,
        pageSize: 10
    }
})

// 返回的数据与useAsyncData返回的数据是一样的
console.log("返回的数据", res)
```



#### NUXT状态管理useState
```javascript
const res = useState('error', () => {
    return 0
})

res.value++
console.log(res.value)
console.log(useState('error').value)
// 分开创建也是可以的
if (import.meta.server) {
    useState('error', () => {
        return 123213
    })
}

if (import.meta.client) {
    console.log(useState('error').value)
}
```



#### pinia状态管理
```javascript
// 定义方式和vite中一样
export const homeState = defineStore('homeState', () => {
    const id = ref<number>(0)

    const getId = () => {
        return id.value
    }

    const setId = (val: number) => {
        id.value = val
    }

    return {
        id,
        getId,
        setId
    }
})
// 在引入时不需要导入可以直接使用
console.log("pinia", homeState().getId())
// 服务端设置，客户端去获取那么数据会被同步过来
if (import.meta.server) {
    homeState().setId(123)
}
/**
 * 做持久化时只能服务端做持久化客户端获取，不能客户端做持久化服务端获取
 */
```



#### 持久化插件：npm i pinia-plugin-persistedstate https://prazdevs.github.io/pinia-plugin-persistedstate/frameworks/nuxt.html
```javascript
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
})
// 使用
export const useStore = defineStore(
  'main',
  () => {
    const someState = ref('hello pinia')
    return { someState }
  },
  {
    persist: true,
  },
)
```



#### 用持久化插件优化路由拦截
```javascript
export default defineNuxtRouteMiddleware((to, from) => {
    const paths: string[] = ['/', '/about', '/login', '/myError']

    if (!paths.includes(to.path)) {
        let token: string = ''

        /**
         * 需要token的就不需要ssr，不需要token的可以ssr，比如请求用户页面需要token当在服务端时直接放行然后客户端还会
         * 再次执行拦截所以此时就是会执行此代码然后验证token。
         */
        if (import.meta.client) {
            token = homeState().getToken() || ''
            if (!token) {
                const query: Record<string, string | number> = {
                    code: 401,
                    message: '请先登录'
                }
                return navigateTo({
                    path: '/login',
                    query
                })
            }
        }
    }
})
```



#### 浏览器同源策略使得请求会自动携带sessionId
```javascript
export default defineNuxtRouteMiddleware((to, from) => {
    const paths: string[] = ['/', '/about', '/login', '/myError']

    if (!paths.includes(to.path)) {
        let token: string = homeState().getToken() || ''
        if (!token) {
            const query: Record<string, string | number> = {
                code: 401,
                message: '请先登录'
            }
            return navigateTo({
                path: '/login',
                query
            })
        }
        /**
         * 需要token的就不需要ssr，不需要token的可以ssr，比如请求用户页面需要token当在服务端时直接放行然后客户端还会
         * 再次执行拦截所以此时就是会执行此代码然后验证token。
         */
    }
})
```



#### nuxt错误处理，在app.vue同级目录下创建一个error.vue（必须时这个名）文件，nuxt出错后则跳转定义的error页面
```javascript
// 在错误页面可以获取错误信息的props
interface Error {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
    data: any
}
const { error } = defineProps<{
    error: Error
}>()
// 客户端想要触发error可以使用showError方法
const getError = () => {
    showError({ statusCode: 404, statusMessage: 'Not Found' })
}
// 清除错误重定向页面
clearError({ redirect: '/login' })
```



## 复习

#### 使用 v-bind 动态样式
```vue
<script setup lang="ts">
const color = ref("red")
</script>

<template>
<div class="text">hello</div>
</template>

<style>
.text {
color: v-bind(color);
}
</style>
<!-- color应用的是vue生成的css变量v-bind(color)会编译成var(--生成的变量) -->
```



#### CSS 模块

```vue
<script lang="ts" setup>
const color = ref('red')
</script>

<template>
	<div :class="$style.red">后台首页</div>
</template>

<style lang="scss" scoped module>
.red {
	color: v-bind(color);
}
</style>
<!-- style必须是module才能使用$style访问class，$style.red会自动生成一个clss名字 -->
```



#### 使用@nuxtjs/google-fonts安装字体

```javascript
// 安装并引入插件
modules: [
	'@nuxtjs/google-fonts'
]
// 字体配置
googleFonts: {
	families: {
		'Klee One': true
	},
	download: true,
	base64: false,
	overwriting: true,
	outputDir: 'assets/fonts'
}
// 运行时会自动下载配置的字体，可直接使用
font-family: 'Times New Roman', 'Klee One';
```



#### 使用nuxt内置标签给页面添加head

```html
<Head>
	<Title>{{ title }}</Title>
	<Meta name="description" :content="title" />
	<Style>
	body { background-color: green; }
	</Style>
</Head>
```



#### 使用 titleTemplate 选项为站点标题提供动态模板，使用 templateParams 在 titleTemplate 中提供除默认 %s 以外的额外占位符

```javascript
// 推荐在app.vue页面设置
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Site Title` : 'Site Title';
  }
})
// 添加占位符
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} %separator %siteName` : '%siteName';
  },
  templateParams: {
    siteName: 'Site Title',
    separator: '-'
  }
})
```



#### 动态添加sdk依赖到body

```javascript
useHead({
  script: [
    {
      src: 'https://third-party-script.com',
      // 有效选项为: 'head' head开始 | 'bodyClose' body结尾 | 'bodyOpen' body开始
      tagPosition: 'bodyClose'
    }
  ]
})
```



#### useAsyncData 组合函数负责包装异步逻辑，并在解析完成后返回结果。

```javascript
// useAsyncData 组合函数是包装并等待多个 $fetch 请求完成后处理结果的绝佳方式。
const { data: discounts, status } = await useAsyncData('cart-discount', async () => {
  const [coupons, offers] = await Promise.all([
    useFetch('/cart/coupons'),
    useFetch('/cart/offers')
  ])

  return { coupons, offers }
})
```



#### 禁用自动导入

```javascript
export default defineNuxtConfig({
  imports: {
    autoImport: false
  }
})
```



#### 部分禁用自动导入，禁用自定义的导入但是内置的ref等导入不受影响

```javascript
export default defineNuxtConfig({
  imports: {
	scan: false
  }
})
```



#### 禁用自动导入组件

```javascript
export default defineNuxtConfig({
  components: {
	dirs: []
  }
})
```



#### 第三方包自动导入

```javascript
export default defineNuxtConfig({
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n']
      }
    ]
  }
})
```



#### 动态组件

```javascript
// 想使用<component :is="someComputedComponent">，必须使用vue提供的resolveComponent
const MyButton = resolveComponent('MyButton')
<component :is="clickable ? MyButton : 'div'" />
```



#### 动态导入

```javascript
// 只需在组件名称前添加 Lazy 前缀
<LazyMountainsList v-if="show" />

// 懒加载api
<LazyMyComponent hydrate-on-visible /> // 当组件进入视口时进行 hydration。
<LazyMyComponent hydrate-on-idle /> // 当浏览器空闲时进行 hydration。
<LazyMyComponent hydrate-on-interaction="mouseover" /> // 在指定交互（例如点击、鼠标悬停）后进行 hydration。
<LazyMyComponent hydrate-on-media-query="(max-width: 768px)" /> // 当窗口匹配媒体查询时进行 hydration。
<LazyMyComponent :hydrate-after="2000" /> // 在指定延迟（以毫秒为单位）后进行 hydration。
<LazyMyComponent :hydrate-when="isReady" /> // 基于布尔条件进行 hydration。
<LazyMyComponent hydrate-never /> // 永不 hydration 组件。
<LazyMyComponent hydrate-on-visible @hydrated="onHydrate" /> //监听 Hydration 事件
```



#### 客户端渲染组件

```javascript
// 在组件文件名后添加 .client 后缀
Comments.client.vue
```



#### 服务器组件

```javascript
// 当它们的 props 更新时，将触发网络请求，从而原地更新渲染的 HTML
export default defineNuxtConfig({
  experimental: {
    componentIslands: true
  }
})
// 或者
HighlightedMarkdown.server.vue
```



#### 动态更改布局

```javascript
function enableCustomLayout () {
  setPageLayout('custom')
}
```



#### 内联中间件

```javascript
export default defineNuxtConfig({
  middleware: [
    function (to, from) {
      // 自定义内联中间件
    },
    'auth',
  ]
})
// 中间件的执行顺序如下：全局中间件（按照首字母排序）->内联中间件（按照首字母排序）->命名中间件（按照首字母排序）
```



#### 动态添加中间件

```javascript
export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-test', () => {
    console.log('此全局中间件在插件中添加，将在每次路由变更时运行')
  }, { global: true })

  addRouteMiddleware('named-test', () => {
    console.log('此命名中间件在插件中添加，将覆盖同名的任何现有中间件')
  })
})
```



#### 构建时设置中间件

```javascript
export default defineNuxtConfig({
  hooks: {
    'pages:extend' (pages) {
      function setMiddleware (pages: NuxtPage[]) {
        for (const page of pages) {
          if (/* 某些条件 */ true) {
            page.meta ||= {}
            // 注意，这将覆盖页面中 `definePageMeta` 设置的任何中间件
            page.meta.middleware = ['named']
          }
          if (page.children) {
            setMiddleware(page.children)
          }
        }
      }
      setMiddleware(pages)
    }
  }
})
```



#### 并行插件

```javascript
export default defineNuxtPlugin({
  name: 'my-plugin',
  parallel: true,
  async setup (nuxtApp) {
    // 下一个插件将立即执行
  }
})
```



#### 依赖插件

```javascript
export default defineNuxtPlugin({
  name: 'depends-on-my-plugin',
  dependsOn: ['my-plugin'],
  async setup (nuxtApp) {
    // 此插件将等待 `my-plugin` 执行结束后再运行
  }
})
```



#### 提供辅助函数

```javascript
export default defineNuxtPlugin(() => {
  return {
    provide: {
      hello: (msg: string) => `Hello ${msg}!`
    }
  }
})

<script setup lang="ts">
// 或者，你也可以在这里使用
const { $hello } = useNuxtApp()
</script>
```



#### 类型定义插件

```javascript
declare module '#app' {
  interface NuxtApp {
    $hello (msg: string): string
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $hello (msg: string): string
  }
}
```



#### Vue 指令

```javascript
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted (el) {
      el.focus()
    },
    getSSRProps (binding, vnode) {
      // 你可以在这里提供 SSR 特定的 props
      return {}
    }
  })
})
```



#### 服务器路由

```javascript
// ~/server/api 内的文件，路由会自动带上 /api 前缀。
// 若想添加无 /api 前缀的服务器路由，可放入 ~/server/routes 目录。
```



#### 通配路由

```javascript
// 例如，创建文件 ~/server/api/foo/[...].ts 将注册一个通配路由，用于匹配所有未被其他路由处理的请求，如 /api/foo/bar/baz
```



#### 状态码

```javascript
// 要返回其他状态码，请使用 setResponseStatus 工具。
export default defineEventHandler((event) => {
  setResponseStatus(event, 202)
})
```



#### 服务器存储

```javascript
export default defineNuxtConfig({
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        /* redis 连接选项 */
        port: 6379, // Redis 端口
        host: "127.0.0.1", // Redis 主机地址
        username: "", // 需 Redis >= 6
        password: "",
        db: 0, // 默认 0
        tls: {} // tls/ssl
      }
    }
  }
})

export default defineEventHandler(async (event) => {
  // 列举所有键
  const keys = await useStorage('redis').getKeys()

  // 设置键值
  await useStorage('redis').setItem('foo', 'bar')

  // 删除键
  await useStorage('redis').removeItem('foo')

  return {}
})

// 或者在服务器插件中定义
import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(() => {
  const storage = useStorage()

  // 动态传入运行时配置或其他来源的凭据
  const driver = redisDriver({
      base: 'redis',
      host: useRuntimeConfig().redis.host,
      port: useRuntimeConfig().redis.port,
      /* 其他 redis 连接选项 */
    })

  // 挂载驱动
  storage.mount('redis', driver)
})
```



#### 事件

```javascript
// 自定义事件
nuxtApp.hook('app:user:registered', payload => {
  console.log('有新用户注册了！', payload)
})

//触发事件
await nuxtApp.callHook('app:user:registered', {
  id: 1,
  name: 'John Doe',
})
```



#### <ClientOnly>

```vue
<!-- 使用 <ClientOnly> 组件仅在客户端渲染组件。 -->
<!--
	placeholderTag | fallbackTag：指定在服务器端渲染的标签。
	placeholder | fallback：指定在服务器端渲染的内容。
 -->
 <template>
  <div>
    <Sidebar />
    <!-- <Comment> 组件仅在客户端渲染 -->
    <ClientOnly fallback-tag="span" fallback="正在加载评论...">
      <Comment />
    </ClientOnly>
  </div>
</template>

<!-- 使用插槽形式置顶服务端渲染的内容 -->
<template>
  <div>
    <Sidebar />
    <!-- 在服务器端渲染为 "span" 元素 -->
    <ClientOnly fallbackTag="span">
      <!-- 此组件仅在客户端渲染 -->
      <Comments />
      <template #fallback>
        <!-- 这将在服务器端渲染 -->
        <p>正在加载评论...</p>
      </template>
    </ClientOnly>
  </div>
</template>
```



#### <DevOnly>

```vue
<!-- 使用 <DevOnly> 组件仅在开发环境中渲染组件。 -->
<template>
  <div>
    <Sidebar />
    <DevOnly>
      <!-- 该组件仅在开发环境中渲染 -->
      <LazyDebugBar />

      <!-- 如果你需要在生产环境中有替代内容 -->
      <!-- 请务必使用 `nuxt preview` 来测试这些内容 -->
      <template #fallback>
        <div><!-- 用于 flex.justify-between 的空 div --></div>
      </template>
    </DevOnly>
  </div>
</template>
```



#### <NuxtClientFallback>

```vue
<!-- 当其子组件在 SSR 中触发错误时，该组件会改为在客户端渲染其内容 -->
<!-- 该组件将会在客户端渲染 -->
<NuxtClientFallback fallback-tag="span">
	<Comments />
	<BrokeInSSR />
</NuxtClientFallback>
<!-- 事件：@ssr-error：当子组件在 SSR 中触发错误时发出该事件。注意该事件仅在服务端触发。 -->
<NuxtClientFallback @ssr-error="logSomeError">
</NuxtClientFallback>

<!--
	placeholderTag | fallbackTag：指定在服务端渲染失败时用作替代的标签。
	placeholder | fallback：指定服务端渲染失败时显示的替代内容。
	keepFallback：如果服务端渲染失败，是否保留替代内容。
 -->
<!-- 如果默认插槽在服务端渲染失败，则使用 <span>Hello world</span> 渲染 -->
<NuxtClientFallback fallback-tag="span" fallback="Hello world">
	<BrokeInSsr />
</NuxtClientFallback>
```



#### <NuxtPicture>

```txt
Nuxt 提供了一个 <NuxtPicture> 组件用于自动图片优化。
```



#### <NuxtTime>

```txt
Nuxt 提供了一个 <NuxtTime> 组件用于格式化时间。
```



#### <NuxtPage>

```javascript
// <NuxtPage> 也支持传递自定义 props，方便你将其逐级向下传递。
<template>
  <NuxtPage :foobar="123" />
</template>
// 在页面中
const props = defineProps<{ foobar: number }>()
console.log(props.foobar) // 输出: 123

const attrs = useAttrs()
console.log(attrs.foobar) // 输出: 123
```



#### <NuxtLayout>

```javascript
// NuxtLayout 也接受你可能需要传递给布局的任何额外属性
<NuxtLayout name="custom" title="我是一个自定义布局">
</NuxtLayout>

<script setup lang="ts">
const layoutCustomProps = useAttrs()

console.log(layoutCustomProps.title) // 我是一个自定义布局
</script>

// 布局的 Ref
const layout = ref()

function logFoo () {
  layout.value.layoutRef.foo()
}
```


#### 静态文件及跨应用链接处理

```javascript
// 对于 /public 目录下的静态文件（如 PDF 或图片），可使用 external 属性确保链接正确解析。
<NuxtLink to="/example-report.pdf" external>
    下载报告
</NuxtLink>
```


#### useAsyncData监听参数
```javascript
// 在检测到任何变化时自动重新执行获取函数
const page = ref(1)
const { data: posts } = await useAsyncData(
  'posts',
  () => $fetch('https://fakeApi.com/posts', {
    params: {
      page: page.value
    }
  }), {
    watch: [page]
  }
)
```


#### useAsyncData响应式键
```javascript
// 键变化时自动更新
const route = useRoute()
const userId = computed(() => `user-${route.params.id}`)

// 当路由变化且 userId 更新时，数据会自动重新获取
const { data: user } = useAsyncData(
  userId,
  () => fetchUserById(route.params.id)
)
```


#### useAsyncData共享状态与选项一致性
```javascript
// 当多次调用 useAsyncData 使用相同键时，它们会共享同一个 data、error 和 status ref
// 同一键的所有调用中保持一致:
{
	handler 函数
	deep 选项
	transform 函数
	pick 数组
	getCachedData 函数
	default 值
}
// 不同且不会触发警告:
{
	server
	lazy
	immediate
	dedupe
	watch
}
```
