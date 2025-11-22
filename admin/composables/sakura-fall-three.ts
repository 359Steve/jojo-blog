import * as THREE from 'three';

export function createSakuraFall(options: {
	container: HTMLElement;
	textureUrls: string[]; // 花瓣或雪花图片列表
	count: number;
}) {
	// 初始化
	const scene = new THREE.Scene();
	// 添加雾气增强空间感
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
	// 如果多季节，随机设置图片
	const textures = options.textureUrls.map((url) => texLoader.load(url));

	// 粒子物体队列
	const petals: THREE.Sprite[] = [];
	for (let i = 0; i < options.count; i++) {
		const tex = textures[Math.floor(Math.random() * textures.length)];
		const material = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.8 + Math.random() * 0.2 });
		const petal = new THREE.Sprite(material);

		// 随机初始位置与大小、距离
		petal.position.set(
			(Math.random() - 0.5) * 800, // X
			Math.random() * 600 - 300, // Y
			Math.random() * 800 - 400, // Z
		);
		petal.scale.set(30 + Math.random() * 20, 30 + Math.random() * 20, 1); // 大小

		petals.push(petal);
		scene.add(petal);
	}

	// 动画
	function animate() {
		requestAnimationFrame(animate);
		// 下落、飘动、旋转
		petals.forEach((p, idx) => {
			// 每个花瓣独立控制运动参数
			const vx = Math.sin(Date.now() * 0.001 + idx) * 0.5;
			const vy = 1.2 + Math.random() * 0.8;
			const vz = Math.cos(Date.now() * 0.001 + idx) * 0.2;

			p.position.x += vx;
			p.position.y -= vy; // 下落
			p.position.z += vz;

			// 添加旋转和翻转参数
			(p.material as any).rotation += vx * 0.02;
			// 控制透明度模拟远近
			p.material.opacity = 1 - Math.abs(p.position.z) / 1000;

			// 到底部重生到顶部
			if (p.position.y < -350 || Math.abs(p.position.x) > 900) {
				p.position.set((Math.random() - 0.5) * 800, 350 + Math.random() * 50, Math.random() * 800 - 400);
			}
		});
		renderer.render(scene, camera);
	}

	animate();

	// 响应尺寸变化
	window.addEventListener('resize', () => {
		camera.aspect = options.container.clientWidth / options.container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(options.container.clientWidth, options.container.clientHeight);
	});
}
