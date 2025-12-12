<script lang="ts" setup>
interface Point {
	x: number;
	y: number;
}

interface BranchLine {
	start: Point;
	lenght: number;
	theta: number;
}

type TaskFn = (b?: BranchLine, deep?: number) => void;

const canvasEl = ref<HTMLCanvasElement | null>(null);
const width = ref<number>(0);
const height = ref<number>(0);
const pendingTasks = ref<TaskFn[]>([]);
const frameCount = ref<number>(0);
const ctx = ref<CanvasRenderingContext2D | null>(null);
let randomSeed = 12345;
const seededRandom = () => {
	randomSeed = (randomSeed * 9301 + 49297) % 233280;
	return randomSeed / 233280;
};

const getEndPoint = (b: BranchLine): Point => {
	return {
		x: b.start.x + b.lenght * Math.cos(b.theta),
		y: b.start.y + b.lenght * Math.sin(b.theta),
	};
};

// 绘制直线
const lineTo = (p1: Point, p2: Point) => {
	ctx.value!.lineWidth = 0.2;
	ctx.value!.beginPath();
	ctx.value!.moveTo(p1.x, p1.y);
	ctx.value!.lineTo(p2.x, p2.y);
	ctx.value!.stroke();
};

// 计算结束点并调用绘制方法
const drawBranch = (b: BranchLine) => {
	lineTo(b.start, getEndPoint(b));
};

const step = (b: BranchLine, deep = 0) => {
	const end = getEndPoint(b);
	// 调用计算结束点方法
	drawBranch(b);

	// 左边的枝
	if (deep < 3 || seededRandom() < 0.5) {
		// 调用计算结束点方法
		pendingTasks.value.push(() =>
			step(
				{
					start: end,
					lenght: b.lenght > 5 ? b.lenght : b.lenght + (seededRandom() * 5 - 1),
					theta: b.theta - 0.3 * seededRandom(),
				},
				deep + 1,
			),
		);
	}

	// 右边的枝
	if (deep < 3 || seededRandom() < 0.5) {
		// 调用计算结束点方法
		pendingTasks.value.push(() =>
			step(
				{
					start: end,
					lenght: b.lenght > 5 ? b.lenght : b.lenght + (seededRandom() * 5 - 1),
					theta: b.theta + 0.3 * seededRandom(),
				},
				deep + 1,
			),
		);
	}
};

const init = () => {
	ctx.value!.strokeStyle = 'rgb(107 114 128 / 0.5)';

	const leftTop: Point = { x: 0, y: 0 };
	const rightBottom: Point = { x: width.value, y: height.value };

	const leftTheta = Math.PI / 4; // 右下 45°
	const rightTheta = (-3 * Math.PI) / 4; // 左上 45°

	const branches: BranchLine[] = [
		{ start: leftTop, lenght: 3, theta: leftTheta },
		{ start: rightBottom, lenght: 3, theta: rightTheta },
	];

	branches.forEach((branch) => step(branch));
};

const frame = () => {
	const tasks = [...pendingTasks.value];
	pendingTasks.value = [];
	tasks.forEach((task) => task());
};

const animate = () => {
	requestAnimationFrame(() => {
		frameCount.value += 1;
		if (frameCount.value % 5 === 0) {
			frame();
		}

		animate();
	});
};

onMounted(() => {
	const rect = canvasEl.value?.getBoundingClientRect();
	const ratio = window.devicePixelRatio || 1;

	if (canvasEl.value && rect) {
		width.value = rect.width;
		height.value = rect.height;

		// 设置实际像素大小
		canvasEl.value.width = rect.width * ratio;
		canvasEl.value.height = rect.height * ratio;

		ctx.value = canvasEl.value.getContext('2d');

		// 缩放上下文，让坐标系统仍然用 CSS 像素
		ctx.value!.scale(ratio, ratio);

		init();
	}

	animate();
});
</script>

<template>
	<div class="fixed inset-0 z-[-1]">
		<canvas ref="canvasEl" class="h-full w-full" />
	</div>
</template>

<style lang="scss" scoped></style>
