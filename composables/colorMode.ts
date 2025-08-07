import { defineStore } from 'pinia';

export const useJojoColorMode = defineStore(
	'useJojoColorMode',
	() => {
		interface ColorModeInstance {
			preference: 'dark' | 'light';
			value: string;
			unknown: boolean;
			forced: boolean;
		}
		const darkMode = ref<ColorModeInstance>(useColorMode() as ColorModeInstance);

		const getDarkMode = () => {
			return darkMode.value;
		};

		const setDarkMode = (type: 'dark' | 'light') => {
			darkMode.value.preference = type;
		};

		return {
			darkMode,
			getDarkMode,
			setDarkMode
		};
	},
	{
		persist: true
	}
);
