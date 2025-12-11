<script lang="ts">
	import type { QuizTimer } from '$lib/timer.svelte';
	import type { SoundManager } from '$lib/sound.svelte';

	let { 
		timer,
		soundManager
	}: { 
		timer: QuizTimer;
		soundManager?: SoundManager;
	} = $props();

	const radius = 120;
	const stroke = 3; // Thinner stroke
	const normalizedRadius = radius - stroke * 2;
	const circumference = normalizedRadius * 2 * Math.PI;
	
	let strokeDashoffset = $derived(circumference - (timer.progress * circumference));
	
	// In the screenshot, the color is a solid purple/gradient, simpler logic
	let isWarning = $derived(timer.timeLeft <= 5);

	async function handleCircleClick() {
		if (timer.status === 'running') {
			timer.pause();
		} else {
			// For idle, paused, or finished states - start/resume
			await soundManager?.prepare();
			timer.start();
		}
	}
</script>

<button
	class="relative flex items-center justify-center cursor-pointer group focus:outline-none"
	onclick={handleCircleClick}
	aria-label={timer.status === 'running' ? 'Pause timer' : timer.status === 'paused' ? 'Resume timer' : timer.status === 'finished' ? 'Restart timer' : 'Start timer'}
>
	<!-- Outer Glow Effect -->
	<div class="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full transform scale-75 opacity-50 group-hover:opacity-70 transition-opacity"></div>

	<svg
		height={radius * 2}
		width={radius * 2}
		class="transform -rotate-90 relative z-10"
	>
		<defs>
			<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="var(--color-primary-500)" /> <!-- purple-500 -->
				<stop offset="100%" stop-color="var(--color-secondary-500)" /> <!-- blue-500 -->
			</linearGradient>
			
			<linearGradient id="warning" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="var(--color-danger-500)" /> <!-- red-500 -->
				<stop offset="100%" stop-color="var(--color-danger-600)" /> <!-- darker red -->
			</linearGradient>
		</defs>

		<!-- Dark Inner Circle Background -->
		<circle
			class="fill-timer-bg group-hover:fill-surface-hover transition-colors duration-200"
			r={radius - 20}
			cx={radius}
			cy={radius}
		/>

		<!-- Track -->
		<circle
			class="stroke-timer-track"
			stroke-width={stroke}
			r={normalizedRadius}
			cx={radius}
			cy={radius}
			fill="transparent"
		/>

		<!-- Progress (normal gradient) -->
		<circle
			stroke="url(#gradient)"
			stroke-width={stroke}
			stroke-dasharray={circumference + ' ' + circumference}
			style="stroke-dashoffset: {strokeDashoffset}"
			stroke-linecap="round"
			r={normalizedRadius}
			cx={radius}
			cy={radius}
			fill="transparent"
			class="transition-opacity duration-[5000ms]"
			opacity={isWarning ? 0 : 1}
		/>

		<!-- Progress (warning gradient) -->
		<circle
			stroke="url(#warning)"
			stroke-width={stroke}
			stroke-dasharray={circumference + ' ' + circumference}
			style="stroke-dashoffset: {strokeDashoffset}"
			stroke-linecap="round"
			r={normalizedRadius}
			cx={radius}
			cy={radius}
			fill="transparent"
			class="transition-opacity duration-[5000ms]"
			opacity={isWarning ? 1 : 0}
		/>
		
		<!-- Knob at the end of progress (optional but nice) -->
	</svg>
	
	<div class="absolute text-center z-20 flex flex-col items-center justify-center pointer-events-none">
		<span class="text-6xl font-medium tabular-nums text-foreground tracking-tight opacity-90">
			{timer.timeLeft}
		</span>
		<span class="text-sm font-medium text-muted-foreground mt-2 tracking-wide group-hover:text-foreground/70 transition-colors">
			{#if timer.status === 'idle'}
				Tap to start
			{:else if timer.status === 'running'}
				Tap to pause
			{:else if timer.status === 'paused'}
				Tap to resume
			{:else}
				Tap to restart
			{/if}
		</span>
	</div>
</button>
