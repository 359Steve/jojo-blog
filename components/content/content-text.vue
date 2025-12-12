<script lang="ts" setup>
interface Props {
	// 文本颜色
	color?: string;
	// 字体大小
	fontSize?: string;
	// 字重：normal | bold | light | 100-900
	fontWeight?: string;
	// 字体系列
	fontFamily?: string;
	// 行高
	lineHeight?: string;
	// 字符间距
	letterSpacing?: string;
	// 文本对齐：left | center | right | justify
	textAlign?: string;
	// 文本装饰：underline | line-through | none
	textDecoration?: string;
	// 斜体
	italic?: string | boolean;
	// 大写：uppercase | lowercase | capitalize | none
	textTransform?: string;
	// 外边距
	margin?: string;
	// 内边距
	padding?: string;
	// 悬停颜色
	hoverColor?: string;
	// 悬停效果：opacity | scale | none
	hoverEffect?: string;
	// 过渡时间
	transitionDuration?: string;
	// 背景色
	backgroundColor?: string;
	// 边框圆角
	borderRadius?: string;
	// 阴影
	textShadow?: string;
	// 显示类型：inline | block | inline-block
	display?: string;
	// 最大宽度
	maxWidth?: string;
	// 溢出处理：hidden | ellipsis
	overflow?: string;
}

const props = withDefaults(defineProps<Props>(), {
	color: 'inherit',
	fontSize: '16px',
	fontWeight: 'normal',
	fontFamily: 'inherit',
	lineHeight: 'normal',
	letterSpacing: 'normal',
	textAlign: 'left',
	textDecoration: 'none',
	italic: false,
	textTransform: 'none',
	margin: '0',
	padding: '0',
	hoverColor: '',
	hoverEffect: 'none',
	transitionDuration: '300ms',
	backgroundColor: 'transparent',
	borderRadius: '0',
	textShadow: 'none',
	display: 'inline',
	maxWidth: 'none',
	overflow: 'visible',
});

// 转换字符串布尔值
const isItalic = computed(() => (typeof props.italic === 'string' ? props.italic === 'true' : props.italic));

// 动态样式
const textStyles = computed(() => ({
	color: props.color,
	fontSize: props.fontSize,
	fontWeight: props.fontWeight,
	fontFamily: props.fontFamily,
	lineHeight: props.lineHeight,
	letterSpacing: props.letterSpacing,
	textAlign: props.textAlign,
	textDecoration: props.textDecoration,
	fontStyle: isItalic.value ? 'italic' : 'normal',
	textTransform: props.textTransform,
	margin: props.margin,
	padding: props.padding,
	backgroundColor: props.backgroundColor,
	borderRadius: props.borderRadius,
	textShadow: props.textShadow,
	display: props.display,
	maxWidth: props.maxWidth,
	transition: `all ${props.transitionDuration} ease`,
	...(props.overflow === 'ellipsis'
		? {
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		}
		: props.overflow === 'hidden'
			? {
				overflow: 'hidden',
			}
			: {}),
}));

// 悬停样式
const hoverStyles = computed(() => {
	if (props.hoverColor) {
		return { '--hover-color': props.hoverColor };
	}
	return {};
});

// CSS类名
const textClasses = computed(() => {
	const classes = [];

	if (props.hoverColor) {
		classes.push('hover-color-change');
	}

	if (props.hoverEffect === 'opacity') {
		classes.push('hover-opacity');
	} else if (props.hoverEffect === 'scale') {
		classes.push('hover-scale');
	}

	return classes;
});
</script>

<template>
	<component :is="display === 'block' ? 'div' : 'span'" :class="textClasses"
		:style="{ ...textStyles, ...hoverStyles }">
		<slot />
	</component>
</template>

<style scoped>
.hover-color-change:hover {
	color: var(--hover-color) !important;
}

.hover-opacity:hover {
	opacity: 0.7;
}

.hover-scale:hover {
	transform: scale(1.05);
}
</style>
