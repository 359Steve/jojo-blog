import { Icon } from '@iconify/vue';
import { Fragment, defineComponent, h } from 'vue';

export default defineComponent({
	name: 'BiliIcon',
	props: {
		iconName: {
			type: String,
			default: 'ri:bilibili-line'
		},
		textName: {
			type: String,
			default: 'BiliBili'
		},
		iconClass: {
			type: String,
			default: ''
		},
		textClass: {
			type: String,
			default: 'text-xs'
		}
	},
	render() {
		return h(Fragment, null, [
			h(Icon, { icon: this.iconName, class: this.iconClass }),
			h('span', { class: this.textClass }, this.textName)
		]);
	}
});
