<script lang="ts" setup></script>

<template>
	<div v-motion:initial="{ opacity: 0, y: 100 }" :enter="{ opacity: 1, y: 0, transition: { delay: 150 } }">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped></style>
