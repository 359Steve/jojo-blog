export interface Timeline {
    id: number
    timestamp: string
    title: string
    description: string,
    url: string
}

export interface StaticImage {
    default: string
    [key: string]: any
}