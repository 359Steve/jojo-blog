<script lang="ts" setup>
const color = ref('red')
</script>

<template>
	<div :class="$style.red">后台首页</div>
</template>

<style lang="scss" scoped module>
.red {
	color: v-bind(color);
}
</style>
