<script lang="ts" setup>
import darkLogo from '~/assets/image/dark_logo.png';
import lightLogo from '~/assets/image/light_logo.png';

const { darkMode } = storeToRefs(useJojoColorMode());
</script>

<template>
	<img
		@click="navigateTo('/')"
		:src="darkMode.preference === 'dark' ? lightLogo : darkLogo"
		alt=""
		class="aspect-3/2 h-full object-cover"
	/>
</template>

<style lang="scss" scoped></style>
