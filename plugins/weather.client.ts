export default defineNuxtPlugin({
	name: 'weather',
	parallel: true,
	async setup() {
		const route = useRoute();
		const config = useAppConfig();
		const { key, baseCityCode, areaCodes, enabled } = config.weather;
		if (!route.path.startsWith('/admin') && enabled) {
			let cityCode = baseCityCode;

			// 封装获取城市码逻辑
			const getCityCodeByLocation = async (lat: number, lng: number) => {
				try {
					const geoResponse = await $fetch<AMapRegeoResponse>('https://restapi.amap.com/v3/geocode/regeo', {
						query: {
							key,
							location: `${lng},${lat}`,
							radius: 1000,
							extensions: 'base',
							output: 'JSON',
						} as AMapRegeoRequest,
					});

					if (geoResponse.status === '1' && geoResponse.regeocode) {
						const addr = geoResponse.regeocode.addressComponent;
						return areaCodes[addr.citycode as keyof typeof areaCodes] || addr.adcode || '110101';
					}
				} catch (err) {
					console.warn('逆地理编码失败:', err);
				}
				return '110101';
			};

			// 获取定位
			try {
				if ('geolocation' in navigator) {
					const position = await new Promise<GeolocationPosition>((resolve, reject) => {
						setTimeout(() => reject(new Error('获取位置超时')), 10000);
						navigator.geolocation.getCurrentPosition(resolve, reject, {
							enableHighAccuracy: true,
							timeout: 8000,
							maximumAge: 300000,
						});
					});

					const { latitude, longitude } = position.coords;
					cityCode = await getCityCodeByLocation(latitude, longitude);
				} else {
					console.warn('浏览器不支持定位，将使用默认城市');
				}
			} catch (geoError) {
				console.warn('定位失败，将使用默认城市:', geoError);
			}

			// 调用天气接口
			try {
				const { data: weather } = await useAsyncData('weather', () =>
					$fetch<WeatherResponse>('https://restapi.amap.com/v3/weather/weatherInfo', {
						query: {
							key,
							city: cityCode,
							extensions: 'all',
							output: 'JSON',
						} as WeatherRequest,
					}),
				);

				if (weather.value?.status === '1') {
					useWeather().setWeather(weather.value.forecasts);
				} else {
					// 天气接口返回错误，使用默认值
				}
			} catch (err) {
				// 天气插件初始化失败，使用默认值
			}
		}
	},
});
