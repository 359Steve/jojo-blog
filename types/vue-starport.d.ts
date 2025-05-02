// types/global.d.ts
import type { DefineComponent } from 'vue'
import type { StarportCarrier, Starport } from 'vue-starport'

declare module 'vue' {
    export interface GlobalComponents {
        StarportCarrier: DefineComponent<Partial<InstanceType<typeof StarportCarrier>['$props']>>,
        Starport: DefineComponent<Partial<InstanceType<typeof Starport>['$props']>>,
    }
}
