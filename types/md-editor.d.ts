// types/global.d.ts
import type { DefineComponent } from 'vue'
import type { MdEditor as MdEditorType } from 'md-editor-v3'

declare module 'vue' {
    export interface GlobalComponents {
        MdEditor: DefineComponent<Partial<InstanceType<typeof MdEditorType>['$props']>>
    }
}
