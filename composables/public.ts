import type { StaticImage } from "~/types/com-types"

// 加载静态图片资源
export const useLoadStaticImage = async (url: string | number): Promise<string> => {
    const res: StaticImage = await import(`~/assets/image/${url}.png`)
    return res.default
}