const getMovPath = (imagePath: string) => {
	return imagePath.replace(/\.\w+$/, '.mov');
};

export default defineNuxtPlugin({
	name: 'previewImg',
	parallel: true,
	setup(nuxtApp) {
		nuxtApp.vueApp.directive('previewImg', {
			getSSRProps() {
				return {};
			},
			mounted(el: HTMLElement, binding) {
				const handler = () => {
					const { setPreviewSrc, setAlt, setPreviewVisible, setIsLive } = usePreviewImg();
					if (binding.value) {
						const data = binding.value as { src: string; alt: string; is_live: boolean };

						setPreviewSrc(data.src);
						setAlt(data.alt);
						setIsLive(data.is_live ? getMovPath(data.src) : '');
						setPreviewVisible(true);
					}
				};

				el.__previewHandler__ = handler;
				el.addEventListener('click', handler);
			},
			unmounted(el: HTMLElement) {
				if (el.__previewHandler__) {
					el.removeEventListener('click', el.__previewHandler__);
					delete el.__previewHandler__;
				}
			},
		});
	},
});
