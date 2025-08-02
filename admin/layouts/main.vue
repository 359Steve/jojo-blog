<script lang="ts" setup></script>

<template>
	<div class="h-[100vh] w-full bg-[#EFF2F5]">
		<ElContainer class="h-full w-full">
			<AdminAside />
			<ElContainer>
				<ElHeader>
					<AdminHeader />
				</ElHeader>
				<ElMain>
					<AdminMain>
						<slot />
					</AdminMain>
				</ElMain>
				<ElFooter>
					<AdminFooter />
				</ElFooter>
			</ElContainer>
		</ElContainer>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-header) {
	@apply p-0;
}

:deep(.el-footer) {
	@apply p-0;
}
</style>
