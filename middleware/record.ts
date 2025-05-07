export default defineNuxtRouteMiddleware((to) => {
    const path = to.path

    // 精准匹配 '/record' 或 '/record/'
    if (path === '/record' || path === '/record/') {
        return navigateTo('/record/home')
    }

    // 匹配 '/record/xxx' 且 xxx 是数字则放行，否则重定向
    if (path.startsWith('/record/')) {
        const subPath = path.replace('/record/', '')
        const isNumeric = /^[0-9]+$/.test(subPath)

        // 允许数字访问，如 /record/123
        if (isNumeric) return

        // 允许特定子路径，比如 '/record/home'（可选）
        if (subPath === 'home') return

        // 否则跳转
        return navigateTo('/record/home')
    }
})
