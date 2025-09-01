import { defineStore } from 'pinia'

export const useJojoHeader = defineStore('jojoHeader', () => {
	type Menu = {
		id: number
		title: string
		path: string
	}
	const isScroll = ref<boolean>(false) // 是否滚动
	const headerHeight = ref<number>(0) // 导航栏高度

	const menuList = reactive<Menu[]>([
		{ id: 1, title: '首页', path: '' },
		{ id: 2, title: '博客', path: '/blog' },
		{ id: 3, title: '日记', path: '/record' },
	])
	const drawer = ref<boolean>(false) // 是否打开侧边菜单弹窗
	const menuId = ref<number>(1) // 当前选中菜单

	const getScroll = () => {
		return isScroll.value
	}

	const setScroll = (value: boolean) => {
		isScroll.value = value
	}

	const getHeaderHeight = () => {
		return headerHeight.value
	}

	const setHeaderHeight = (value: number) => {
		headerHeight.value = value
	}

	return {
		isScroll,
		headerHeight,
		menuList,
		drawer,
		menuId,
		getScroll,
		setScroll,
		getHeaderHeight,
		setHeaderHeight
	}
})
