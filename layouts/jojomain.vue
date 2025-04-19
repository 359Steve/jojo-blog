<script lang='ts' setup>
interface Point {
    x: number
    y: number
}

interface BranchLine {
    start: Point
    lenght: number
    theta: number
}

const canvasEl = ref<HTMLCanvasElement | null>(null)
const width = ref<number>(0)
const height = ref<number>(0)
const pendingTasks = ref<Function[]>([])
const frameCount = ref<number>(0)

const ctx = computed(() => canvasEl.value!.getContext('2d')!)

const getEndPoint = (b: BranchLine): Point => {
    return {
        x: b.start.x + b.lenght * Math.cos(b.theta),
        y: b.start.y + b.lenght * Math.sin(b.theta)
    }
}

// 计算结束点并调用绘制方法
const drawBranch = (b: BranchLine) => {
    lineTo(b.start, getEndPoint(b))
}

// 绘制直线
const lineTo = (p1: Point, p2: Point) => {
    ctx.value.beginPath()
    ctx.value.moveTo(p1.x, p1.y)
    ctx.value.lineTo(p2.x, p2.y)
    ctx.value.stroke()
}

const step = (b: BranchLine, deep = 0) => {
    const end = getEndPoint(b)
    // 调用计算结束点方法
    drawBranch(b)

    // 左边的枝
    if (deep < 3 || Math.random() < 0.5) {
        // 调用计算结束点方法
        pendingTasks.value.push(() => step({
            start: end,
            lenght: b.lenght > 5 ? b.lenght : b.lenght + (Math.random() * 5 - 1),
            theta: b.theta - 0.4 * Math.random()
        }, deep + 1))
    }

    // 右边的枝
    if (deep < 3 || Math.random() < 0.5) {
        // 调用计算结束点方法
        pendingTasks.value.push(() => step({
            start: end,
            lenght: b.lenght > 5 ? b.lenght : b.lenght + (Math.random() * 5 - 1),
            theta: b.theta + 0.4 * Math.random()
        }, deep + 1))
    }
}

const init = () => {
    ctx.value.strokeStyle = '#dbdbdb'

    // 左边界起点
    const leftPoint: Point = {
        x: 0,
        y: Math.random() * height.value
    }
    const leftTheta = -Math.PI / 4 + Math.random() * (Math.PI / 2) // 向右偏上/下

    // 右边界起点
    const rightPoint: Point = {
        x: width.value,
        y: Math.random() * height.value
    }
    const rightTheta = Math.PI + Math.PI / 4 - Math.random() * (Math.PI / 2) // 向左偏上/下

    // 下边界起点
    const bottomPoint: Point = {
        x: Math.random() * width.value,
        y: height.value
    }
    const bottomTheta = -Math.PI / 2 + (Math.random() * 0.4 - 0.2) // 向上偏左/右

    // 构建三条起始分支
    const branches: BranchLine[] = [
        { start: leftPoint, lenght: 2, theta: leftTheta },
        { start: rightPoint, lenght: 2, theta: rightTheta },
        { start: bottomPoint, lenght: 2, theta: bottomTheta }
    ]

    // 对每条起始分支执行 step()
    branches.forEach(branch => step(branch))
}

const frame = () => {
    const tasks = [...pendingTasks.value]
    pendingTasks.value = []
    tasks.forEach(task => task())
}

const animate = () => {
    requestAnimationFrame(() => {
        frameCount.value++
        if (frameCount.value % 3 === 0) {
            frame()
        }
        
        animate()
    })
}

onMounted(() => {
    const rect = canvasEl.value?.getBoundingClientRect()
    if (canvasEl.value && rect) {
        width.value = rect.width
        height.value = rect.height

        // 设置 canvas 的绘图尺寸
        canvasEl.value.width = rect.width
        canvasEl.value.height = rect.height

        init()
    }
    animate()
})
</script>

<template>
    <div class="relative w-full h-full">
        <!-- <div class="fixed top-0 w-full h-[100vh] z-[-1] min-w-[1280px]">
            <canvas ref="canvasEl" class="w-full h-full"></canvas>
        </div> -->
        <div class="w-full h-full">
            <!-- 导航栏 -->
            <HeaderBox></HeaderBox>
            <slot name="page"></slot>
        </div>
    </div>
</template>

<style lang='scss' scoped></style>