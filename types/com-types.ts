import type { ShallowRef } from "vue"

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

export interface UseBoundingClientRect {
    top: ShallowRef<number, number>
    right: ShallowRef<number, number>
    bottom: ShallowRef<number, number>
    left: ShallowRef<number, number>
    width: ShallowRef<number, number>
    height: ShallowRef<number, number>
    x: ShallowRef<number, number>
    y: ShallowRef<number, number>
    update: () => void
}