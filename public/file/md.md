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
