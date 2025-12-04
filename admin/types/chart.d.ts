// types/global.d.ts
import type { DefineComponent } from 'vue';
import type VChart from 'vue-echarts';

declare module 'vue' {
	export interface GlobalComponents {
		VChart: DefineComponent<Partial<InstanceType<typeof VChart>['$props']>>;
	}
}
