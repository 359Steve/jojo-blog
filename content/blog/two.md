---
title: '我的第二篇博客'
cover: '/images/home2.png'
description: '这是我的第二篇博客的简介……'
tags:
    - name: Nuxt2
      icon: simple-icons:nuxtdotjs
      color: '#00DC82'
      url: 'https://nuxtjs.org/'
    - name: Vue
      icon: simple-icons:vuedotjs
      color: '#42B883'
      url: 'https://vuejs.org/'
date: 2025-12-15
---

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
