<script lang="ts" setup></script>

<template>
	<div class="w-full">
		<section class="flex h-[100vh] w-full items-center justify-center font-serif">
			<div class="container mx-auto">
				<div class="flex justify-center">
					<slot name="error" />
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped></style>
