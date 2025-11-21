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

const images = ref<ImageOptions[]>([
	{ url: Spring, count: 10, size: 40 },
	{ url: Summer, count: 5, size: 40 },
	{ url: Autumn, count: 10, size: 40 },
	{ url: Snowflake, count: 100, size: 15 },
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
			return images.value[2];
		default:
			return images.value[0];
	}
});

// 创建粒子
const createSakura = (
	x: number,
	y: number,
	size: number,
	rotation: number,
	fn: SakuraParticle['fn'],
): SakuraParticle => {
	return {
		x,
		y,
		size,
		rotation,
		fn,
	};
};

// 更新单个粒子
const updateSakura = (sakura: SakuraParticle) => {
	sakura.x = sakura.fn.x(sakura.x, sakura.y);
	sakura.y = sakura.fn.y(sakura.y, sakura.y);
	sakura.rotation = sakura.fn.r(sakura.rotation);

	// 检查是否超出边界，重新设置位置
	if (sakura.x > window.innerWidth || sakura.x < 0 || sakura.y > window.innerHeight || sakura.y < 0) {
		const resetFromTop = Math.random() > 0.4;
		if (resetFromTop) {
			sakura.x = getRandom('x');
			sakura.y = 0;
		} else {
			sakura.x = window.innerWidth;
			sakura.y = getRandom('y');
		}
		sakura.size = getRandom('s');
		sakura.rotation = getRandom('r');
		sakura.fn = {
			x: getRandom('fnx'),
			y: getRandom('fny'),
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
	for (let i = 0; i < count; i++) {
		const sakura = createSakura(getRandom('x'), getRandom('y'), getRandom('s'), getRandom('r'), {
			x: getRandom('fnx'),
			y: getRandom('fny'),
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
