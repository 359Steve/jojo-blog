export const usePreviewImg = defineStore('previewImg', () => {
	const previewVisible = ref<boolean>(false);
	const previewSrc = ref<string>('');
	const alt = ref<string>('');

	const setPreviewVisible = (value: boolean) => {
		previewVisible.value = value;
	};

	const setPreviewSrc = (value: string) => {
		previewSrc.value = value;
	};

	const setAlt = (value: string) => {
		alt.value = value;
	};

	const getAlt = () => {
		return alt.value;
	};

	const getPreviewVisible = () => {
		return previewVisible.value;
	};

	const getPreviewSrc = () => {
		return previewSrc.value;
	};

	return {
		previewVisible,
		previewSrc,
		alt,
		getPreviewSrc,
		getPreviewVisible,
		getAlt,
		setAlt,
		setPreviewSrc,
		setPreviewVisible,
	};
});
