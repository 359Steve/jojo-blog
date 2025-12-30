---
title: '我的第一篇博客'
cover: '/images/home1.png'
description: '这是我的第一篇博客的简介……'
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

::TextTitle
## 标题一
::

::LinkBox
---
title: 了解更多关于 Nuxt Content
---
::TextTitle
## 标题二
::
::


::ContentImage
---
images:
      - /images/home1.png
      - /images/home2.png
      - /images/home3.png
      - /images/home4.png
      - /images/home1.png
      - /images/home2.png
      - /images/home3.png
      - /images/home4.png
---
::TextTitle
## 标题三
::
::

```javascript
export default defineAppConfig({
	title: 'Nuxt App',
	info: {
		id: 1,
	},
});
```
