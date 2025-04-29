// types/global.d.ts
import type { DefineComponent } from 'vue'
import type { MdEditor, MdPreview } from 'md-editor-v3'

declare module 'vue' {
    export interface GlobalComponents {
        MdEditor: DefineComponent<Partial<InstanceType<typeof MdEditor>['$props']>>,
        MdPreview: DefineComponent<Partial<InstanceType<typeof MdPreview>['$props']>>
    }
}
