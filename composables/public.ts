import type { StaticImage } from '~/types/com-types';

// 加载静态图片资源
export const useLoadStaticImage = async (url: string | number): Promise<string> => {
	const res: StaticImage = await import(`~/assets/image/${url}.png`);
	return res.default;
};

// 判断设备型号
export const detectDeviceDetail = (): {
	type: 'mobile' | 'tablet' | 'desktop';
	model: string;
} => {
	const ua = navigator.userAgent;

	// Apple 设备
	if (/iPhone/.test(ua)) return { type: 'mobile', model: 'iPhone' };
	if (/iPad/.test(ua)) return { type: 'tablet', model: 'iPad' };
	if (/Macintosh/.test(ua)) return { type: 'desktop', model: 'Mac' };

	// Android 设备
	if (/Android/.test(ua)) {
		// 判断手机和平板
		const isMobile = /Mobile/.test(ua);
		const modelMatch = ua.match(/Android.*;\s([^;)]*)/);
		const model = modelMatch ? modelMatch[1].trim() : 'Android Device';
		return {
			type: isMobile ? 'mobile' : 'tablet',
			model
		};
	}

	// Windows PC
	if (/Windows/.test(ua)) return { type: 'desktop', model: 'Windows PC' };

	// Linux 桌面
	if (/Linux/.test(ua)) return { type: 'desktop', model: 'Linux' };

	// 默认未知设备
	return { type: 'desktop', model: 'Unknown Device' };
};
