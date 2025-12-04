<script lang="ts" setup>
import type { EChartsOption } from 'echarts';

const selectOptions = ref(monthArrData());
const year = ref<string>(new Date().getFullYear().toString());
const optionValue = ref<number>(new Date().getMonth() + 1);
const currentDays = computed(() => {
	return (
		selectOptions.value
			.find((item) => item.month === optionValue.value)
			?.monthDayList.map((day) => `${day.day}号`)
			.filter(Boolean) || []
	);
});

const views = Array.from({ length: 30 }, () => Math.floor(Math.random() * 300) + 20);

const option = ref<EChartsOption>({
	tooltip: {
		trigger: 'axis',
		axisPointer: { type: 'shadow' },
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true,
	},
	xAxis: {
		type: 'category',
		data: currentDays.value,
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			name: '每日浏览量',
			type: 'bar',
			data: views,
			itemStyle: {
				color: '#a855f7',
			},
		},
	],
});

watch([optionValue, currentDays], () => {
	option.value.xAxis = { type: 'category', data: currentDays.value };
	option.value.series = [
		{
			name: '每日浏览量',
			type: 'bar',
			data: Array.from({ length: currentDays.value.length }, () => Math.floor(Math.random() * 300) + 20),
			itemStyle: { color: '#a855f7' },
		},
	];
});

watch(year, (newYear) => {
	selectOptions.value = monthArrData(new Date(newYear).getFullYear());
	optionValue.value = new Date().getMonth() + 1;
});
</script>

<template>
	<TableHeight>
		<template #default="{ height }">
			<ClientOnly>
				<div class="flex w-full flex-col" :style="{ height: `${height}px` }">
					<div class="flex w-full items-center justify-between">
						<div class="text-[16px] font-semibold"><span>每月访问量统计</span></div>
						<div class="flex items-center justify-between gap-2">
							<el-date-picker v-model="year" type="year" class="!w-[120px]" placeholder="请选择年份" />
							<el-select v-model="optionValue" placeholder="请选择月份" class="!w-[100px]">
								<el-option v-for="item in selectOptions" :key="item.name" :label="item.name"
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
