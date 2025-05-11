export interface Timeline {
    id: string
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

export interface Summary {
    id: string
    icon: string
    title: string
    summary: string
    year: string
}

export interface RecordSummary {
    id: string
    year: string
    data: Summary[]
}