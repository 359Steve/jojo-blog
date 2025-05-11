<script lang="ts" setup>
const { baseClass = 'duration-700', animationClass = 'animate__fadeInUp' } = defineProps<{
    baseClass?: string
    animationClass?: string
}>()

defineEmits<{
    (e: 'click'): void
}>()

const el = ref<HTMLElement | null>(null)
const visible = ref<boolean>(false)

useIntersectionObserver(el, ([entry]) => {
    if (entry.isIntersecting) {
        visible.value = true
    }
}, {
    threshold: 0.1
})
</script>

<template>
    <div ref="el" :class="[
            'transition-all ease-out animate__animated',
            visible ? animationClass : 'animate__fadeOut',  // 默认隐藏状态
            baseClass
        ]"
        @click="$emit('click')"
    >
        <slot></slot>
    </div>
</template>

