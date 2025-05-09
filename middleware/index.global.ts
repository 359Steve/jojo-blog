// 全局路由中间件
export default defineNuxtRouteMiddleware((to, _from) => {
    const path = to.path
    // 导航栏基础路由
    const { menuList, menuId } = storeToRefs(useJojoHeader())
    // 动态切换头像
    const { avatarUrl } = storeToRefs(useVueStarport())

    path.startsWith('/record/') ? avatarUrl.value = 'my' : avatarUrl.value = 'index_bg'

    if (!menuList.value.some(item => item.path === path)) {
        menuId.value = 0
    } else {
        for (const item of menuList.value) {
            if (item.path === path) {
                menuId.value = item.id
                return true
            }
        }
    }
})