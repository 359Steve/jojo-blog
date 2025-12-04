import { use } from 'echarts/core';
import VChart from 'vue-echarts';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components';

export default defineNuxtPlugin({
	name: 'chart',
	parallel: true,
	setup(nuxtApp) {
		use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, TitleComponent]);
		nuxtApp.vueApp.component('VChart', VChart);
	},
});
