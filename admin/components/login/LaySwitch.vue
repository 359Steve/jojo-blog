<script lang="ts" setup>
const { darkMode } = storeToRefs(useJojoColorMode());
const selectTheme = ref<boolean>(darkMode.value.preference !== 'dark');

const changeTheme = (value: boolean | string | number): void => {
	useJojoColorMode().setDarkMode(value ? 'light' : 'dark');
};
</script>

<template>
	<ElSwitch v-model="selectTheme" inline-prompt :active-icon="getIcons().DayIcon" :inactive-icon="getIcons().DarkIcon"
		@change="changeTheme" />
</template>

<style lang="scss" scoped></style>
