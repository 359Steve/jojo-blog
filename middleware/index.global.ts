// 全局路由中间件
export default defineNuxtRouteMiddleware((to, _from) => {
    // 导航栏基础路由
    const { menuList, menuId } = storeToRefs(useJojoHeader())

    if (!menuList.value.some(item => item.path === to.path)) {
        menuId.value = 0
    } else {
        for (const item of menuList.value) {
            if (item.path === to.path) {
                menuId.value = item.id
                return true
            }
        }
    }
})