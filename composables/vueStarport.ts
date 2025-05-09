import { defineStore } from 'pinia'

export const useVueStarport = defineStore('vueStarport', () => {
    const avatarUrl = ref<string>('index_bg')
    const isRound = ref<boolean>(false)

    const getIsRound = (): boolean => {
        return isRound.value
    }

    const setIsRound = (value: boolean): void => {
        isRound.value = value
    }

    const getAvatarUrl = (): string => {
        return avatarUrl.value
    }

    const setAvatarUrl = (value: string): void => {
        avatarUrl.value = value
    }

    return {
        isRound,
        avatarUrl,
        setIsRound,
        getIsRound,
        getAvatarUrl,
        setAvatarUrl
    }
})