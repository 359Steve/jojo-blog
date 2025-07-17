<script lang="ts" setup>
const visible = ref(true);
</script>

<template>
	<button @click="visible = !visible">切换</button>
	<Motion>
		<div class="box">Hello Motion</div>
	</Motion>
</template>

<style lang="scss" scoped></style>
