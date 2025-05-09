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

export interface RecordList {
    id: number
    title: string
}

export interface RecordButtonList {
    id: number
    icon: string
    title: string
    href: string
}