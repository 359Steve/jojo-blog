<script setup lang="ts">
import Spring from '~/assets/image/spring.png';
import Snowflake from '~/assets/image/snowflake.png';
import Summer from '~/assets/image/summer.png';
import Autumn from '~/assets/image/autumn.png';

interface SakuraParticle {
	x: number;
	y: number;
	size: number;
	rotation: number;
	fn: {
		x: (x: number, y: number) => number;
		y: (x: number, y: number) => number;
		r: (r: number) => number;
	};
}

interface ImageOptions {
	url: string;
	count: number;
	size: number;
}

const { getWeather } = useWeather();
const weather = computed(() => getWeather());
const { power } = weather.value;

const windDirMap: Record<string, [number, number]> = {
	北: [0, -1],
	东北: [1, -1],
	东: [1, 0],
	东南: [1, 1],
	南: [0, 1],
	西南: [-1, 1],
	西: [-1, 0],
	西北: [-1, -1],
};

const images = ref<ImageOptions[]>([
	{ url: Spring, count: power ? power * 10 : 10, size: 30 },
	{ url: Summer, count: power ? power * 5 : 5, size: 40 },
	{ url: Autumn, count: power ? power * 10 : 10, size: 40 },
	{ url: Snowflake, count: power ? power * 100 : 100, size: 15 },
]);

const canvas = templateRef<HTMLCanvasElement>('canvas');
const ctx = ref<CanvasRenderingContext2D | null>(null);
const animationFrameId = ref<number>();
const sakuraList = ref<SakuraParticle[]>([]);

const currentImageUrl = computed(() => {
	const month = new Date().getMonth() + 1;
	switch (month) {
		case 12:
		case 1:
		case 2:
			return images.value[3];
		case 3:
		case 4:
		case 5:
			return images.value[0];
		case 6:
		case 7:
		case 8:
			return images.value[1];
		case 9:
		case 10:
		case 11:
			return images.value[0];
		default:
			return images.value[0];
	}
});

// 根据风向获取粒子重生位置
const getRespawnPosition = () => {
	const { wind, power } = weather.value;
	const [wx] = windDirMap[wind] ?? [0, 0];
	const windForce = wx * (0.6 + power * 0.4);

	let x, y;

	if (windForce > 0.3) {
		// 强向右风：从左侧和顶部生成
		if (Math.random() < 0.7) {
			x = -50 - Math.random() * 100; // 从左侧外部生成
			y = Math.random() * window.innerHeight * 0.8;
		} else {
			x = Math.random() * window.innerWidth;
			y = -20;
		}
	} else if (windForce < -0.3) {
		// 强向左风：从右侧和顶部生成
		if (Math.random() < 0.7) {
			x = window.innerWidth + 50 + Math.random() * 100; // 从右侧外部生成
			y = Math.random() * window.innerHeight * 0.8;
		} else {
			x = Math.random() * window.innerWidth;
			y = -20;
		}
	} else {
		// 微风或无风：主要从顶部生成，少量从侧面
		if (Math.random() < 0.9) {
			x = Math.random() * window.innerWidth;
			y = -20;
		} else {
			// 偶尔从侧面生成
			if (Math.random() < 0.5) {
				x = -30;
				y = Math.random() * window.innerHeight * 0.5;
			} else {
				x = window.innerWidth + 30;
				y = Math.random() * window.innerHeight * 0.5;
			}
		}
	}

	return { x, y };
};

// 创建粒子
const createSakura = (
	x: number,
	y: number,
	size: number,
	rotation: number,
	fn: SakuraParticle['fn'],
): SakuraParticle => {
	return { x, y, size, rotation, fn };
};

// 更新单个粒子
const updateSakura = (sakura: SakuraParticle) => {
	sakura.x = sakura.fn.x(sakura.x, sakura.y);
	sakura.y = sakura.fn.y(sakura.y, sakura.y);
	sakura.rotation = sakura.fn.r(sakura.rotation);

	// 检查粒子是否需要重生
	const margin = 100;
	if (sakura.y > window.innerHeight + margin || sakura.x > window.innerWidth + margin || sakura.x < -margin) {
		const { wind, power } = weather.value;
		const [wx] = windDirMap[wind] ?? [0, 0];
		const windForce = wx * (0.6 + power * 0.4);

		// 使用改进的重生位置逻辑
		const respawnPos = getRespawnPosition();
		sakura.x = respawnPos.x;
		sakura.y = respawnPos.y;
		sakura.size = getRandom('s');
		sakura.rotation = getRandom('r');
		sakura.fn = {
			x: (x) => x + windForce + (Math.random() - 0.5) * 0.3,
			y: (y) => y + 1.2 + Math.random() * 0.8,
			r: getRandom('fnr'),
		};
	}
};

// 绘制单个粒子
const drawSakura = (sakura: SakuraParticle, context: CanvasRenderingContext2D, img: HTMLImageElement) => {
	context.save();
	context.translate(sakura.x, sakura.y);
	context.rotate(sakura.rotation);
	const baseSize = currentImageUrl.value.size * sakura.size;
	const aspect = img.width / img.height;

	const drawW = baseSize * aspect;
	const drawH = baseSize;

	context.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
	context.restore();
};

// 更新所有粒子
const updateAllSakura = () => {
	sakuraList.value.forEach(updateSakura);
};

// 绘制所有粒子
const drawAllSakura = (context: CanvasRenderingContext2D, img: HTMLImageElement) => {
	sakuraList.value.forEach((sakura) => drawSakura(sakura, context, img));
};

// 获取随机值的辅助函数
function getRandom(option: 'x' | 'y' | 's' | 'r'): number;
function getRandom(option: 'fnx' | 'fny'): (x: number, y: number) => number;
function getRandom(option: 'fnr'): (r: number) => number;
function getRandom(option: string) {
	switch (option) {
		case 'x':
			return Math.random() * window.innerWidth;
		case 'y':
			return Math.random() * window.innerHeight;
		case 's':
			return 0.5 + Math.random() * 0.5;
		case 'r':
			return Math.random() * 2 * Math.PI;
		case 'fnx': {
			const v = -0.5 + Math.random();
			return (x: number, _y: number) => x + v;
		}
		case 'fny': {
			const v = 1 + Math.random();
			return (_x: number, y: number) => y + v;
		}
		case 'fnr': {
			const v = (Math.random() - 0.5) * 0.02;
			return (r: number) => r + v;
		}
		default:
			return 0;
	}
}

// 初始化粒子列表
const initSakuraList = (count: number = 50) => {
	sakuraList.value = [];
	const { wind, power } = weather.value;
	const [wx] = windDirMap[wind] ?? [0, 0];
	const windForce = wx * (0.6 + power * 0.4);

	for (let i = 0; i < count; i++) {
		// 初始化时也使用改进的位置生成逻辑
		const pos = Math.random() < 0.8 ? { x: getRandom('x'), y: getRandom('y') } : getRespawnPosition();

		const sakura = createSakura(pos.x, pos.y, getRandom('s'), getRandom('r'), {
			x: (x) => x + windForce + (Math.random() - 0.5) * 0.3,
			y: (y) => y + 1.2 + Math.random() * 0.8,
			r: getRandom('fnr'),
		});
		sakuraList.value.push(sakura);
	}
};

// 动画循环
const animate = (context: CanvasRenderingContext2D, img: HTMLImageElement) => {
	if (!canvas.value) return;

	context.clearRect(0, 0, canvas.value.width, canvas.value.height);
	updateAllSakura();
	drawAllSakura(context, img);
	animationFrameId.value = requestAnimationFrame(() => animate(context, img));
};

onMounted(() => {
	const cvs = canvas.value;
	if (!cvs) return;

	const context = cvs.getContext('2d');
	if (!context) return;

	ctx.value = context;

	const resizeCanvas = () => {
		cvs.width = window.innerWidth;
		cvs.height = window.innerHeight;
	};

	useResizeObserver(cvs, resizeCanvas);
	resizeCanvas();

	const img = new Image();
	img.src = currentImageUrl.value.url;

	img.onload = () => {
		initSakuraList(currentImageUrl.value.count);
		animate(context, img);
	};
});

onBeforeUnmount(() => {
	if (animationFrameId.value) {
		cancelAnimationFrame(animationFrameId.value);
	}
});
</script>

<template>
	<canvas ref="canvas" class="pointer-events-none fixed left-0 top-0 h-full w-full" />
</template>

<style lang="scss" scoped></style>
