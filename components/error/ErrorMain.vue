<script lang="ts" setup></script>

<template>
	<div class="h-full w-full">
		<section class="flex h-full w-full justify-center font-serif">
			<div class="container mx-auto">
				<div class="flex h-full items-center justify-center">
					<slot name="error" />
				</div>
			</div>
		</section>
	</div>
</template>

<style lang="scss" scoped></style>
