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

    const setDarkMode = (type: string) => {
        darkMode.value.preference = type
    }

    return {
        darkMode,
        getDarkMode,
        setDarkMode
    }
}, {
    persist: true
})