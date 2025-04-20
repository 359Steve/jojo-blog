import { defineStore } from 'pinia'

export const useJojoColorMode = defineStore('useJojoColorMode', () => {
    interface ColorModeInstance {
        preference: string
        value: string
        unknown: boolean
        forced: boolean
    }
    const darkMode = ref(useColorMode())

    const getDarkMode = () => {
        return darkMode.value
    }

    const setDarkMode = (item: ColorModeInstance) => {
        darkMode.value = item
    }

    return {
        darkMode,
        getDarkMode,
        setDarkMode
    }
}, {
    persist: true
})