<script setup lang="ts">
const props = defineProps<{
	code?: string
	language?: string
	meta?: string
	filename?: string
	highlights?: number[]
}>()

const meta = computed(() => {
	return props.meta?.split(';')
})

const fold = ref<boolean>(meta.value?.[1] === 'true')

const icon = computed(() => meta.value?.[0] ?? '')

const { copy } = useClipboard()
const isCopy = ref<boolean>(false)

const copyed = async () => {
	await copy(props.code || '')
	isCopy.value = true
}
</script>

<template>
	<div class="my-5 rounded-md border dark:border-[#314158]">
		<div class="group cursor-pointer relative flex items-center justify-between bg-white dark:bg-[#020618] gap-1.5 px-4 py-2"
			:class="[fold ? 'rounded-md' : 'rounded-t-md border-b dark:border-[#314158]']" @click="fold = !fold"
			@mouseleave="isCopy = false">
			<div class="flex items-center gap-2">
				<Icon :icon="icon" class="size-4 shrink-0" aria-hidden="true" />
				<span class="text-default text-sm/6">{{ props.language }}</span>
			</div>
			<div class="absolute items-center gap-2 right-4 md:hidden md:group-hover:flex">
				<span v-if="isCopy" class="text-[14px]">复制成功</span>
				<div class="cursor-pointer p-1 border rounded-md dark:border-[#314158]" @click.stop="copyed">
					<Icon icon="mdi:content-copy" />
				</div>
			</div>
		</div>
		<pre class="group rounded-b-md font-mono text-sm/6 overflow-x-auto px-4 py-3 bg-[#F8FAFC] dark:bg-[#0F172C]"
			:class="[fold ? 'hidden' : 'block']" v-bind="$attrs"><code><slot/></code></pre>
	</div>
</template>

<style lang="scss" scoped></style>
