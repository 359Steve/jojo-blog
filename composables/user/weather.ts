export const useWeather = defineStore('user-weather', () => {
	const currentWeather = ref<Forecast[]>([]);

	const getWeather = () => {
		const hour = new Date().getHours();
		const isDayTime = hour >= 6 && hour < 18;

		const item = currentWeather.value[0].casts[0];

		const wind = isDayTime ? item.daywind : item.nightwind;
		const powerRange = isDayTime ? item.daypower : item.nightpower;
		const power = Number(powerRange.split('-')[1] || powerRange.split('-')[0] || 1);

		return { wind, power };
	};

	const setWeather = (weather: Forecast[]) => {
		currentWeather.value = weather;
	};

	return {
		currentWeather,
		getWeather,
		setWeather,
	};
});
