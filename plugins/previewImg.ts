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
					const { setPreviewSrc, setAlt, setPreviewVisible } = usePreviewImg();
					if (binding.value) {
						const data = binding.value as { src: string; alt: string };
						setPreviewSrc(data.src);
						setAlt(data.alt);
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
