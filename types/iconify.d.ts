// types/global.d.ts
import type { DefineComponent } from 'vue';
import type { Icon } from '@iconify/vue';

declare module 'vue' {
	export interface GlobalComponents {
		Icon: DefineComponent<Partial<InstanceType<typeof Icon>['$props']>>;
	}
}
