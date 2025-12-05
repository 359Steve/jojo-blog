<script lang="ts" setup>
import type { EChartsOption } from 'echarts';

const { title, color, type } = defineProps<{
	title: string;
	color: string;
	type: 'blog' | 'record';
}>();

// 选择的年份和月份
const year = ref<string>(new Date().getFullYear().toString());
const month = ref<number>(new Date().getMonth() + 1);
// 默认获取今年本月天数
const selectMonth = computed(() => monthArrData(new Date(year.value).getFullYear()));

// 根据选择的月份获取对应的号数列表
const currentDays = computed(() => {
	return (
		selectMonth.value
			.find((item) => item.month === month.value)
			?.monthDayList.map((day) => `${day.day}号`)
			.filter(Boolean) || []
	);
});

// 获取浏览量统计
const { data } = await useAsyncData(
	`blog-or-record-views-statistical-${type}`,
	() =>
		getViewsStatistical({
			year: new Date(year.value).getFullYear(),
			month: month.value,
			type,
		}),
	{
		watch: [year, month],
	},
);
const views = computed(() => data.value?.data || []);

const option = computed<EChartsOption>(() => ({
	tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
	grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
	xAxis: { type: 'category', data: currentDays.value },
	yAxis: {
		type: 'value',
		min: 0,
		max: Math.max(...views.value, 10) * 1.2,
		minInterval: 1,
		axisLabel: { formatter: '{value} 次' },
	},
	series: [
		{
			name: '每日浏览量',
			type: 'bar',
			data: views.value,
			itemStyle: { color },
		},
	],
}));
</script>

<template>
	<TableHeight>
		<template #default="{ height }">
			<ClientOnly>
				<div class="flex w-full flex-col" :style="{ height: `${height}px` }">
					<div class="flex w-full items-center justify-between">
						<div class="text-[16px] font-semibold">
							<span>每月访问量统计（{{ title }}）</span>
						</div>
						<div class="flex items-center justify-between gap-2">
							<el-date-picker v-model="year" type="year" class="!w-[120px]" :clearable="false"
								placeholder="请选择年份" />
							<el-select v-model="month" placeholder="请选择月份" class="!w-[100px]">
								<el-option v-for="item in selectMonth" :key="item.name" :label="item.name"
									:value="item.month" />
							</el-select>
						</div>
					</div>
					<VChart :option="option" class="w-full flex-1" autoresize />
				</div>
			</ClientOnly>
		</template>
	</TableHeight>
</template>

<style lang="scss" scoped></style>
