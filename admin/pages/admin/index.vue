<template>
	<div class="container min-h-svh bg-stone-50 px-6 text-stone-900 xl:px-12">
		<div class="grid md:grid-cols-2 md:gap-8 xl:gap-12">
			<div class="flex items-start">
				<div class="sticky top-0 py-12">
					<h5 class="text-xs uppercase tracking-wide">our process</h5>
					<h2 class="mb-6 mt-4 text-4xl font-bold tracking-tight">
						Planning your
						<span class="text-indigo-500">project development</span>
						journey
					</h2>
					<p class="max-w-prose text-sm">
						Our journey begins with a deep dive into your vision. In the Discovery phase, we engage in
						meaningful conversations to grasp your brand identity, goals, and the essence you want to
						convey. This phase sets the stage for all that follows.
					</p>
				</div>
			</div>

			<CardsstackContainerScroll class-name="min-h-[400vh] space-y-8 py-12">
				<CardsstackCardSticky v-for="(phase, index) in processPhases" :key="phase.id" :index="index + 2"
					class-name="rounded-2xl border p-8 shadow-md backdrop-blur-md">
					<div class="flex items-center justify-between gap-4">
						<h2 class="my-6 text-2xl font-bold tracking-tighter">{{ phase.title }}</h2>
						<h3 class="text-2xl font-bold text-indigo-500">{{ String(index + 1).padStart(2, '0') }}</h3>
					</div>
					<p class="text-foreground">{{ phase.description }}</p>
				</CardsstackCardSticky>
			</CardsstackContainerScroll>
		</div>
	</div>
</template>

<script setup lang="ts">
const processPhases = [
	{
		id: 'process-1',
		title: 'Research and Analysis',
		description:
			'With your vision in mind, we enter the Research and Analysis phase. Here, we examine your competitors, industry trends, and user preferences.',
	},
	{
		id: 'process-2',
		title: 'Wireframing and Prototyping',
		description:
			'We move on to Wireframing and Prototyping, creating skeletal representations to refine the user experience.',
	},
	{
		id: 'process-3',
		title: 'Design Creation',
		description:
			'Our talented designers bring your vision to life, ensuring it aligns perfectly with your brand identity.',
	},
	{
		id: 'process-4',
		title: 'Development and Testing',
		description:
			'Developers turn designs into a fully functional site, with rigorous testing to ensure seamless experience.',
	},
	{
		id: 'process-5',
		title: 'Launch and Support',
		description: 'We provide post-launch support to keep your website updated and optimized.',
	},
];
</script>
