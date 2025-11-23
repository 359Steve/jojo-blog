import * as THREE from 'three';

// 风向映射表
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

export function createSakuraFall(options: {
	container: HTMLElement;
	textureUrls: ImageOptions;
	weather: {
		wind: string;
		power: number;
	};
}) {
	// 初始化
	const scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xfaf6f0, 200, 1200);

	const camera = new THREE.PerspectiveCamera(
		60,
		options.container.clientWidth / options.container.clientHeight,
		1,
		2000,
	);
	camera.position.set(0, 0, 600);

	const renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(options.container.clientWidth, options.container.clientHeight);
	options.container.appendChild(renderer.domElement);

	// 加载纹理
	const texLoader = new THREE.TextureLoader();

	// 获取天气信息
	const { wind, power } = options.weather;
	const [wx, wy] = windDirMap[wind] ?? [0, 0];
	const windForceX = wx * (0.6 + power * 0.4);
	const windForceZ = wy * (0.3 + power * 0.2);

	// 粒子物体队列
	const petals: THREE.Sprite[] = [];

	// 获取重生位置
	const getRespawnPosition = () => {
		let x, y, z;

		if (windForceX > 0.3) {
			// 强向右风：从左侧和顶部生成
			if (Math.random() < 0.7) {
				x = -500 - Math.random() * 200; // 增加生成范围
				y = Math.random() * 600 - 300;
				z = Math.random() * 800 - 400;
			} else {
				x = Math.random() * 800 - 400;
				y = 400 + Math.random() * 100; // 增加顶部生成范围
				z = Math.random() * 800 - 400;
			}
		} else if (windForceX < -0.3) {
			// 强向左风：从右侧和顶部生成
			if (Math.random() < 0.7) {
				x = 500 + Math.random() * 200; // 增加生成范围
				y = Math.random() * 600 - 300;
				z = Math.random() * 800 - 400;
			} else {
				x = Math.random() * 800 - 400;
				y = 400 + Math.random() * 100; // 增加顶部生成范围
				z = Math.random() * 800 - 400;
			}
		} else {
			// 微风或无风：主要从顶部生成，少量从侧面
			if (Math.random() < 0.9) {
				x = Math.random() * 800 - 400;
				y = 400 + Math.random() * 100; // 增加顶部生成范围
				z = Math.random() * 800 - 400;
			} else {
				if (Math.random() < 0.5) {
					x = -500 - Math.random() * 100; // 增加左侧生成范围
					y = Math.random() * 300 - 150;
					z = Math.random() * 800 - 400;
				} else {
					x = 500 + Math.random() * 100; // 增加右侧生成范围
					y = Math.random() * 300 - 150;
					z = Math.random() * 800 - 400;
				}
			}
		}

		return { x, y, z };
	};

	// 动画相关句柄
	let animationId: number | null = null;

	const outerBaseSize = options.textureUrls.maxSize;

	// 当纹理加载完成后创建粒子并启动动画
	texLoader.load(
		options.textureUrls.url,
		(loadedTex) => {
			// 确保 image 已就绪，获取宽高比用于保持比例
			const img = loadedTex.image as HTMLImageElement;
			const aspect = img && img.width && img.height ? img.width / img.height : 1;

			// 创建粒子
			for (let i = 0; i < options.textureUrls.count; i++) {
				const material = new THREE.SpriteMaterial({ map: loadedTex, transparent: true });
				const petal = new THREE.Sprite(material);

				// 初始位置
				const pos =
					Math.random() < 0.8
						? {
							x: (Math.random() - 0.5) * 800,
							y: Math.random() * 600 - 300,
							z: Math.random() * 800 - 400,
						}
						: getRespawnPosition();

				petal.position.set(pos.x, pos.y, pos.z);

				// 大小设置（保持图片比例），记录 baseSize 到 userData，用于重生时恢复
				const baseSize = options.textureUrls.maxSize;
				const size = baseSize * (0.5 + Math.random() * 0.5);
				petal.scale.set(size * aspect, size, 1);

				// 存储粒子数据
				petal.userData = {
					velocity: {
						x: windForceX + (Math.random() - 0.5) * 0.3,
						y: -(1.2 + Math.random() * 0.8), // 下落速度 (负向)
						z: windForceZ + (Math.random() - 0.5) * 0.2,
					},
					rotationSpeed: (Math.random() - 0.5) * 0.02,
					phase: Math.random() * Math.PI * 2, // 用于摆动效果
					swingAmplitude: 0.5 + Math.random() * 1, // 摆动幅度
					baseSize: size,
					// respawnTimer: 在重生后短暂隐藏并延迟几帧再开始运动，避免闪烁
					respawnTimer: 0,
				};

				petals.push(petal);
				scene.add(petal);
			}

			// 启动动画（纹理加载后）
			function animateLoaded() {
				animationId = requestAnimationFrame(animateLoaded);

				const time = Date.now() * 0.001;

				// 每帧重新读取当前天气，确保运行时修改 power/wind 能生效
				const currentWeather = (options as any).weather ?? { wind: '无', power: 1 };
				const [cwx, cwy] = windDirMap[currentWeather.wind] ?? [0, 0];
				const curWindForceX = cwx * (0.6 + (currentWeather.power ?? 1) * 0.4);
				const curWindForceZ = cwy * (0.3 + (currentWeather.power ?? 1) * 0.2);

				petals.forEach((petal) => {
					const data = petal.userData as any;

					// 如果刚重生，短暂隐藏并延迟几帧再开始运动，避免从旧位置瞬移到新位置导致一闪
					if (data.respawnTimer && data.respawnTimer > 0) {
						data.respawnTimer -= 1;
						// 如果计时尚未结束，保持隐藏并跳过运动计算
						if (data.respawnTimer > 0) {
							(petal.material as THREE.SpriteMaterial).opacity = 0;
							return; // 跳到下一个粒子
						}
						// 计时刚结束：恢复可见并将速度设置为与初始创建粒子时一致的速度（基于当前风力 + 随机扰动）
						(petal.material as THREE.SpriteMaterial).opacity = 1;
						// 恢复为与初始创建时相同的速度分布，使用当前风力值
						data.velocity.x = curWindForceX + (Math.random() - 0.5) * 0.3;
						data.velocity.y = -(1.2 + Math.random() * 0.8);
						data.velocity.z = curWindForceZ + (Math.random() - 0.5) * 0.2;
					}

					// 每帧让速度向当前风速（含随机扰动）轻微靠拢，保证运行时改变 wind/power 会逐步生效
					const desiredVX = curWindForceX + (Math.random() - 0.5) * 0.3;
					const desiredVZ = curWindForceZ + (Math.random() - 0.5) * 0.2;
					// 以小步长朝目标速度逼近，保持平滑
					data.velocity.x += (desiredVX - data.velocity.x) * 0.06;
					data.velocity.z += (desiredVZ - data.velocity.z) * 0.06;

					// 基础下落 + 风力影响
					petal.position.x += data.velocity.x;
					petal.position.y += data.velocity.y;
					petal.position.z += data.velocity.z;

					// 限制速度范围，避免速度过快
					data.velocity.x = clamp(data.velocity.x, -2, 2);
					data.velocity.y = clamp(data.velocity.y, -2, 2);
					data.velocity.z = clamp(data.velocity.z, -2, 2);

					// 添加摆动效果
					const swing = Math.sin(time + data.phase) * data.swingAmplitude * 0.1;
					petal.position.x += swing;
					petal.position.z += Math.cos(time + data.phase) * data.swingAmplitude * 0.05;

					// 旋转效果
					(petal.material as THREE.SpriteMaterial).rotation += data.rotationSpeed;

					// 边界缓冲区 fade 取最小值
					const margin = 150;
					const fadeArr = [1];
					if (petal.position.x > 400) fadeArr.push(Math.max(0, 1 - (petal.position.x - 400) / margin));
					if (petal.position.x < -400) fadeArr.push(Math.max(0, 1 - (-400 - petal.position.x) / margin));
					if (petal.position.y > 350) fadeArr.push(Math.max(0, 1 - (petal.position.y - 350) / margin));
					if (petal.position.y < -350) fadeArr.push(Math.max(0, 1 - (-350 - petal.position.y) / margin));
					if (petal.position.z > 400) fadeArr.push(Math.max(0, 1 - (petal.position.z - 400) / margin));
					if (petal.position.z < -400) fadeArr.push(Math.max(0, 1 - (-400 - petal.position.z) / margin));
					const fade = Math.min(...fadeArr);

					// 透明度渐变
					(petal.material as THREE.SpriteMaterial).opacity = fade;

					// 完全透明后重生
					if (fade <= 0.01) {
						// 生成安全区位置
						const respawnPos = getSafeRespawnPosition();
						petal.position.set(respawnPos.x, respawnPos.y, respawnPos.z);
						// 根据大小动态调整速度，保证小粒子不会太快
						const newSize = outerBaseSize * (0.5 + Math.random() * 0.5);
						(data as any).baseSize = newSize;
						petal.scale.set(newSize * aspect, newSize, 1);
						// 小粒子速度更慢的处理已移除：重生时使用与初始创建相同的速度分布
						// 先把不连续的显示隐藏，设置短暂延迟再开始运动，避免瞬移闪烁
						(petal.material as THREE.SpriteMaterial).opacity = 0;
						data.respawnTimer = 3; // 延迟帧数，可调
						// 初始速度设为基于风速的小比例速度（使用与创建时相同的分布），后续帧恢复为正常速度
						const smallRatio = 0.2; // 重生短暂移动的比例，越小越不突兀
						data.velocity.x = clamp((curWindForceX + (Math.random() - 0.5) * 0.3) * smallRatio, -1, 1);
						data.velocity.y = clamp(-(1.2 + Math.random() * 0.8) * smallRatio, -1, 1);
						data.velocity.z = clamp((curWindForceZ + (Math.random() - 0.5) * 0.2) * smallRatio, -1, 1);
						data.rotationSpeed = (Math.random() - 0.5) * 0.02;
						data.phase = Math.random() * Math.PI * 2;
						// 在 respawnTimer 计时结束后会恢复 opacity
					}
				});

				renderer.render(scene, camera);
			}

			animateLoaded();
		},
		undefined,
		(err) => {
			// 加载失败时记录错误，不阻塞主线程

			console.error('Texture load error', err);
		},
	);

	// 响应尺寸变化
	const resizeObserver = new ResizeObserver(() => {
		camera.aspect = options.container.clientWidth / options.container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(options.container.clientWidth, options.container.clientHeight);
	});

	resizeObserver.observe(options.container);

	// 清理函数
	return () => {
		// 停止动画
		if (animationId) cancelAnimationFrame(animationId);
		resizeObserver.disconnect();
		petals.forEach((petal) => {
			scene.remove(petal);
			petal.material.dispose();
		});
		options.container.removeChild(renderer.domElement);
		renderer.dispose();
	};

	// 优化重生逻辑，保证新粒子生成在安全区，速度合理
	function getSafeRespawnPosition() {
		let x, y, z;
		const safeMargin = 250;
		if (windForceX > 0.3) {
			if (Math.random() < 0.7) {
				x = -500 - Math.random() * safeMargin;
				y = Math.random() * 600 - 300;
				z = Math.random() * 800 - 400;
			} else {
				x = Math.random() * 800 - 400;
				y = 400 + (Math.random() * safeMargin) / 2;
				z = Math.random() * 800 - 400;
			}
		} else if (windForceX < -0.3) {
			if (Math.random() < 0.7) {
				x = 500 + Math.random() * safeMargin;
				y = Math.random() * 600 - 300;
				z = Math.random() * 800 - 400;
			} else {
				x = Math.random() * 800 - 400;
				y = 400 + (Math.random() * safeMargin) / 2;
				z = Math.random() * 800 - 400;
			}
		} else {
			if (Math.random() < 0.9) {
				x = Math.random() * 800 - 400;
				y = 400 + (Math.random() * safeMargin) / 2;
				z = Math.random() * 800 - 400;
			} else {
				if (Math.random() < 0.5) {
					x = -500 - (Math.random() * safeMargin) / 2;
					y = Math.random() * 300 - 150;
					z = Math.random() * 800 - 400;
				} else {
					x = 500 + (Math.random() * safeMargin) / 2;
					y = Math.random() * 300 - 150;
					z = Math.random() * 800 - 400;
				}
			}
		}
		return { x, y, z };
	}
}

// 优化粒子速度范围，避免速度过快
const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value));
