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
    timeRange: string
}

export interface RecordSummary {
    id: string
    timeRange: string 
    title: string
    role: string
    summary: string
    data: Summary[]
}

export interface Error {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
    data: any
}

export interface Tags {
    name: string
    icon: string
}

export interface BlogList {
    id: number
    title: string
    tags: Tags[]
    description: string
    url: string
}