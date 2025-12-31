---
title: 'Nuxt 常用配置和生命周期钩子的使用'
cover: '/images/home1.png'
description: '前文对Nuxt的基本异常捕获和状态处理做了介绍，结合之前的内容其实可以使用nuxt完成大部分纯前端应用的开发了。本文将对前文提到的Nuxt配置项做补充并大致介绍一下Nuxt的生命周期钩子。'
tags:
    - name: Nuxt3
      icon: vscode-icons:file-type-nuxt
      color: #00DC82
      url: https://nuxtjs.org/.
    - name: Vue
      icon: ri:vuejs-fill
      color: #42B883
      url: https://vuejs.org/
date: 2025-12-15
---

---

某种意义上说，即使是今天，开源对我来说仍然是一个非常新且未知的领域。

自从我开始学习编程和了解开源，我就一直梦想着成为一名全职的开源开发者。在大学期间，我怀着被开源社区认可的渴望，不断寻找自己能参与的有重大影响力的项目。突然之间，你会迎来一个转折点，你的项目可能会出乎意料地获得成功，或者被邀请加入一个重量级项目。在那一刻，所有的激动和随之而来的责任感突然涌上心头。几天后，当最初的兴奋感逐渐消散，你开始意识到这还意味着巨大的责任和许多你之前未曾考虑过的事情。虽然我在大学期间一直努力跻身开源界，但当我真正踏入这一领域时，才发现自己有多么的措手不及。

关于开源有趣的一点是 你可能永远不会准备好。你可能会遇到棘手的技术问题，或者需要不断追赶新兴技术的脚步，但除了编码之外，还会有许多其他事情需要你去应对。你要成为 客服 去解答问题；成为 设计师、 作家 去编写一份精美的文档；成为 项目经理 确保项目正常推进；成为 团队领导 来接纳新的贡献者并保持团队的积极性；推广 你的作品；在大会上发表 演讲；等等。这些都是作为开源开发者的「额外影响」，不仅仅是代码，很多其他事情也会随之而来。

对我来说，这是一个巨大的挑战。我是一个相当内向的人，我不擅长聊天或交谈。我在学校时，**英语成绩很差**，也没有说英文的自信。我非常怯场，即便只是在同学面前，我也会非常紧张。我想我也不喜欢团队管理，尽管我从未真正领导过一个团队 —— 有太多事情值得害怕。

但现实并不会给你充足的时间去做好充足的准备（或者从另一方面来看，如果不迈出第一步，你可能永远不会准备妥当），随着项目的发展，你的职责也随之增加，你会被迫学习和适应。当它自然地成长为一个团队时，你就得学会沟通，学会领导。当有人邀请你做播客或者演讲时，他们不会等你三年时间来练习语言或演讲技巧 —— 你要么错过机会，要么就面对恐惧向前进。因为我对开源的热爱，我必须战胜自己、克服恐惧。

这些事情可能看起来难以应对，但如果你逐一接受并克服这些挑战，你可能会慢慢发现，这些经历其实是相当有趣且充满回报的。事到如今，我非常感激曾经的这些机会，它们促使我走出舒适区，迫使我进步。在做开源的这四年里，尽管我在很多方面仍不尽完美，但我能够更加自信流利地说英语了；我在许多研讨会上演讲，有些会议的参与者甚至达到了数千人，每次演讲前，我仍然会感到非常紧张，但至少我不再害怕上台了。

---

### Nuxt的配置文件

在之前的文章，我们多次使用nuxt.config.ts 的配置文件，在模块使用，css 的引入等等都有使用到。

本次就大致了解一下nuxt 相关的配置模块有哪些。

前文我们在其中配置了诸如modules、runtimeConfig、build以及vite等内容

Nuxt 支持 Vite 和 Webpack 这两种打包工具，默认选用 Vite。

我们可以根据项目具体需求，通过设置builder属性进行选择。

例如，若要将打包工具配置为 Webpack，可以进行如下设置：

```javascript vscode-icons:file-type-js-official
export default defineNuxtConfig({ builder: "webpack" });
```

需要注意的是，此时需要安装 @nuxt/webpack-builder。

相应地，如果想要修改对应打包工具的配置，可以分别使用vite或webpack选项，具体配置如下：

```javascript vscode-icons:file-type-js-official
export default defineNuxtConfig({ vite: {}, webpack: {} });
```

### 设置不同的渲染模式配置项

````javascript vscode-icons:file-type-js-official
//执行 pnpm generate 打包的就是spa
export default defineNuxtConfig({ ssr: false });

//混合渲染配置
routeRules: {
	'/': { prerender: true },
	// 产品页面按需生成，后台自动重新验证
	'/products/**': { swr: 3600 },
	// 博客文章按需生成，直到下一次部署前持续有效
	'/blog/**': { isr: true },
	// 管理仪表板仅在客户端渲染
	'/admin/**': { ssr: false },
	// 在API路由上添加cors头
	'/api/**': { cors: true },
	// 跳转旧的URL
	'/old-page': { redirect: '/new-page' }
}
````

### 自动导入配置项

```javascript vscode-icons:file-type-js-official
imports: {
	dirs: ['constant']
},
```

### Nuxt.config.ts

Nuxt 有默认配置可满足大部分需求，若要覆盖或扩展，可在项目根目录创建 nuxt.config.ts，其默认导出 defineNuxtConfig () 的执行结果，与默认配置合并后生效，如前文增加的模块配置。

### App.config.ts

如果想要在项目中配置一些公共变量，可以在项目根目录下创建一个名为 app.config.ts 的文件。这些变量具有响应式的特点，也就是说，不仅在运行时能够被访问，而且还可以进行修改。以下是一个配置范例

```javascript vscode-icons:file-type-js-official
// 导出配置对象
export default defineAppConfig<AppConfig>({
	apiBaseUrl: 'https://your-api-url.com', // 设置后端 API 的基础 URL
  	defaultPageSize: 10, // 设置默认每页数据条数为 10
  	appName: 'My Awesome App',
  	themeMode: 'light',
  	defaultPageTitle: 'Welcome to My App',
  	themeColors: {
    	primary: '#4CAF50', // 设置主要主题颜色为绿色
    	secondary: '#2196F3', // 设置次要主题颜色为蓝色
  	},
});
```

当我们想使用这些公共变量的时候

```javascript vscode-icons:file-type-js-official
const appConfig = useAppConfig();
console.log('App Name:', appConfig.appName);
console.log('Theme Mode:', appConfig.themeMode);
console.log('Default Page Title:', appConfig.defaultPageTitle);
```

### 其它配置

像我们写项目会配置很多辅助模块，比如说前文我们引入的  tailwind 需要tailwind.config.js 去配置相应内容，如果我们使用unocss 那么也就需要配置 uno.config.ts

这类配置和我们普通的项目开发没有区别，主要还是依赖我们使用的库。

### Nuxt的生命周期钩子

Nuxt 的生命周期钩子包含三个部分分别是 Nuxt应用本身的生命周期，vue app的生命周期，以及Nitro 的生命周期。

### Nuxt生命周期

在 Nuxt 的构建过程中，这些钩子贯穿了初始化和构建的各个阶段，为开发者提供了丰富的机会来干预并定制构建流程。

无论是使用 Nuxi 进行项目初始化和配置管理，还是借助 Vite 和 Webpack 进行资源打包和优化，亦或是利用 Nitro 进行服务器端渲染和静态生成，这些钩子都发挥着重要作用。

以下是一些 Nuxt 钩子的实际应用案例：

一、build:before钩子用于清理旧的构建产物

在持续集成/持续部署（CI/CD）环境中，确保每次构建都是干净的非常重要。可以使用build:before钩子在构建开始前删除旧的构建产物目录，防止旧文件干扰新的构建。

```javascript vscode-icons:file-type-js-official
import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
	setup(options, nuxt) {
		nuxt.hook('build:before', () => {
			const buildDir = '.nuxt';
			if (fs.existsSync(buildDir)) {
				fs.rmSync(buildDir, { recursive: true });
			}
		});
	}
});
```

二、nitro:init钩子用于添加自定义的服务器中间件

假设你需要在服务器端添加一个日志中间件来记录所有的请求。可以使用nitro:init钩子在 Nitro 初始化后添加这个中间件。

```javascript vscode-icons:file-type-js-official
import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
	setup(options, nuxt) {
		nuxt.hook('nitro:init', (nitro) => {
			nitro.hooks.hook('preHandler', (req, res, next) => {
				console.log(`Received request: ${req.url}`);
				next();
			});
		});
	}
});
```

三、vite:extendConfig钩子用于添加自定义的 Vite 插件

如果你想在开发过程中使用一个特定的 Vite 插件来处理某种类型的文件，可以使用vite:extendConfig钩子添加这个插件。

```javascript vscode-icons:file-type-js-official
import { defineNuxtModule } from '@nuxt/kit';
//示例插件，不存在
import customVitePlugin from 'custom-vite-plugin';
export default defineNuxtModule({
	setup(options, nuxt) {
		nuxt.hook('vite:extendConfig', (viteConfig) => {
			viteConfig.plugins.push(customVitePlugin());
		});
	}
});
```

四、pages:extend钩子用于动态添加路由

在某些情况下，你可能需要根据某些条件动态地添加路由。例如，根据用户的角色动态生成特定的页面路由。

```javascript vscode-icons:file-type-js-official
import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
	setup(options, nuxt) {
		nuxt.hook('pages:extend', (pages) => {
			if (isUserAdmin()) {
				pages.push({
					name: 'admin-page',
					path: '/admin',
					component: '~/pages/admin.vue'
				});
			}
		});
	}
});
```

五、build:manifest钩子用于优化资源加载

可以使用build:manifest钩子来优化资源的加载顺序或者添加额外的资源引用。例如，对于一个特定的页面，确保某个关键的 CSS 文件在其他资源之前加载。

```javascript vscode-icons:file-type-js-official
import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
	setup(options, nuxt) {
		nuxt.hook('build:manifest', (manifest) => {
			const pageEntry = manifest.entrypoints.find(entry => entry.name === 'your-page-name');
			if (pageEntry) {
				pageEntry.css.unshift('path/to/important.css');
			}
		});
	}
});
```

### Vue App 生命周期

Vue App 的钩子会在运行时被调用，并且主要用于编写插件。这些钩子能够让开发者在 Vue 的渲染生命周期的特定阶段插入自定义的代码逻辑。

例如，在开发一个性能监控插件时，可以利用created钩子来初始化性能数据收集器。当 Vue 实例创建完成后，插件可以开始记录各种性能指标，如页面加载时间、组件渲染时间等。

```javascript vscode-icons:file-type-js-official
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:created', (vueApp) => {
		const performanceData = {};
		vueApp.config.globalProperties.$startPerformanceTracking = () => {
			// 开始记录性能数据
			performanceData.startTime = new Date().getTime();
		};
		vueApp.config.globalProperties.$stopPerformanceTracking = () => {
			// 停止记录性能数据并进行分析
			const endTime = new Date().getTime();
			const loadTime = endTime - performanceData.startTime;
			console.log(`Page load time: ${loadTime}ms`);
		};
    });
});
```

### Nitro App 生命周期

Nitro App 钩子在 Nitro 引擎运行之际被调用，这为开发者编写服务端插件提供了契机。

通过这些插件，能够针对性地修改和扩展 Nitro 引擎的默认行为。

比如，可以调整响应头信息以增强安全性，或者优化数据处理流程以提升性能。这种灵活性使得开发者能够根据具体项目需求，定制化 Nitro 引擎的功能，从而构建出更加高效、强大的服务端应用程序。

一、自定义响应头增强安全性

可以使用 Nitro App 的钩子来添加特定的响应头，增强应用的安全性。例如，添加 Content-Security-Policy 响应头来限制页面可以加载的资源来源，防止恶意脚本的注入。

```javascript vscode-icons:file-type-js-official
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hook('render:html', (htmlContext) => {
		htmlContext.res.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;");
		return htmlContext;
    });
});
```

关于更多nitro生命周期钩子的使用大家可以查阅生命周期文档

> [Nuxt 生命周期钩子文档](https://nuxt.com/docs/guide/concepts/lifecycle-hooks)

> [配置 - Nitro (unjs.io)](https://nitro.unjs.io/configuration/#hooks)

### 总结

Nuxt 的生命周期钩子部分涵盖内容是比较宽泛的，大家可以发现前后端都有涉及到，大家可以注意到我前面几篇文章几乎没有提到Nuxt 的服务端开发，而是围绕着前端需要做的部分来实现。

由于一般情况下很少会让前端开发这个岗位直接开发后端内容所以这几篇文章我都围绕着前端的内容来讲，基本上了解以上知识就可以使用Nuxt完成一个项目的开发了。

大家可能听说过在 C/S 架构中间添加一个 node.js 中间层来处理前端所需数据的概念。实际上，Nuxt 也非常适合充当这个中间层，来对后端数据做处理，我们再请求Nuxt的接口，当然它也可以直接用于构建后端。

后续我将对服务端的部分做介绍，并补充一些nuxt的详细内容，比如modelus开发等。
