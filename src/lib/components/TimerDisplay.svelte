<script lang="ts">
	import type { QuizTimer } from '$lib/timer.svelte';

	let { timer }: { timer: QuizTimer } = $props();

	const radius = 120;
	const stroke = 3; // Thinner stroke
	const normalizedRadius = radius - stroke * 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	
	let strokeDashoffset = $derived(circumference - (timer.progress * circumference));
	
	// In the screenshot, the color is a solid purple/gradient, simpler logic
	let isWarning = $derived(timer.timeLeft <= 10);
</script>

<div class="relative flex items-center justify-center">
	<!-- Outer Glow Effect -->
	<div class="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full transform scale-75 opacity-50"></div>

	<svg
		height={radius * 2}
		width={radius * 2}
		class="transform -rotate-90 relative z-10"
	>
		<defs>
			<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="#a855f7" /> <!-- purple-500 -->
				<stop offset="100%" stop-color="#3b82f6" /> <!-- blue-500 -->
			</linearGradient>
			
			<linearGradient id="warning" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="#ef4444" /> <!-- red-500 -->
				<stop offset="100%" stop-color="#f97316" /> <!-- orange-500 -->
			</linearGradient>
		</defs>

		<!-- Dark Inner Circle Background -->
		<circle
			class="fill-[#13131F]"
			r={radius - 20}
			cx={radius}
			cy={radius}
		/>

		<!-- Track -->
		<circle
			class="stroke-gray-800/50"
			stroke-width={stroke}
			r={normalizedRadius}
			cx={radius}
			cy={radius}
			fill="transparent"
		/>

		<!-- Progress -->
		<circle
			stroke={isWarning ? "url(#warning)" : "url(#gradient)"}
			stroke-width={stroke}
			stroke-dasharray={circumference + ' ' + circumference}
			style="stroke-dashoffset: {strokeDashoffset}"
			stroke-linecap="round"
			r={normalizedRadius}
			cx={radius}
			cy={radius}
			fill="transparent"
			class="transition-all duration-300"
		/>
		
		<!-- Knob at the end of progress (optional but nice) -->
	</svg>
	
	<div class="absolute text-center z-20 flex flex-col items-center justify-center">
		<span class="text-6xl font-medium tabular-nums text-white tracking-tight opacity-90">
			{timer.timeLeft}
		</span>
		<span class="text-sm font-medium text-gray-400 mt-2 tracking-wide">
			{timer.status === 'idle' ? 'Ready' : timer.status === 'finished' ? 'Time\'s up' : 'Remaining'}
		</span>
	</div>
</div>
