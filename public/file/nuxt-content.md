## Nuxt content

#### MD文件创建目录: content/_/_.md

```txt
在content目录下创建对应的md文件，例如：hello-world.md
```

#### 读取并显示内容

pages下创建页面

```vue
<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first());

useSeoMeta({
	title: home.value?.title,
	description: home.value?.description,
});
</script>

<template>
	<ContentRenderer v-if="home" :value="home" />
	<div v-else>Home not found</div>
</template>
```

#### 安装并引入插件

```bash
npm install @nuxt/content
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
	modules: ['@nuxt/content'],
});
```

#### content.config.ts

此配置会创建一个默认集合，用于处理项目文件夹content中的所有 Markdown 文件。您可以根据需要自定义集合设置。

```ts
import { defineContentConfig, defineCollection } from '@nuxt/content';

export default defineContentConfig({
	collections: {
		content: defineCollection({
			type: 'page',
			source: '**/*.md',
		}),
	},
});
```

#### build

Nuxt Content 会在构建时读取并解析所有可用内容。此选项允许您控制内容的解析过程。

```ts
export default defineNuxtConfig({
	modules: ['@nuxt/content'],
	content: {
		build: {
			// 选项
		},
	},
});
```

#### markdown

配置content目录最高支持的markdown目录深度

```ts
export default defineNuxtConfig({
	modules: ['@nuxt/content'],
	content: {
		build: {
			markdown: {
				toc: {
					depth: 2,
					searchDepth: 2,
				},
			},
		},
	},
});
```

#### remarkPlugins

您可以使用 remarkPlugins 选项来添加自定义的 Remark 插件，以扩展 Markdown 的功能。例如，您可以添加一个插件来支持数学公式渲染。

```ts
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
export default defineNuxtConfig({
	modules: ['@nuxt/content'],
	content: {
		build: {
			markdown: {
				remarkPlugins: [remarkMath],
				rehypePlugins: [rehypeKatex],
			},
		},
	},
});
```

#### contentHeading

配置内容标题的样式,提取 Markdown 的标题（# H1、## H2、### H3 等）

```ts
export default defineNuxtConfig({
	modules: ['@nuxt/content'],
	content: {
		build: {
			markdown: {
				contentHeading: true,
			},
		},
	},
});
```

#### highlight

配置代码高亮主题

```ts
export default defineNuxtConfig({
	modules: ['@nuxt/content'],
	content: {
		build: {
			markdown: {
				highlight: {
					theme: 'github-dark',
					// 或者
					theme: {
						default: 'github-light',
						dark: 'github-dark',
						sepia: 'monokai',
					},
				},
			},
		},
	},
});
```
