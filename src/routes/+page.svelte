<script lang="ts">
	import { QuizTimer } from '$lib/timer.svelte';
	import { SoundManager } from '$lib/sound.svelte';
	import TimerDisplay from '$lib/components/TimerDisplay.svelte';
	import Controls from '$lib/components/Controls.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import { untrack } from 'svelte';

	// Initialize state
	const timer = new QuizTimer();
	const soundManager = new SoundManager();
	
	let isSettingsOpen = $state(false);

	// Sound Effects
	$effect(() => {
		if (timer.status === 'running' && timer.timeLeft > 0) {
			timer.timeLeft;
			untrack(() => {
				soundManager.playTick();
			});
		}
	});

	$effect(() => {
		if (timer.status === 'finished') {
			untrack(() => {
				soundManager.playAlarm();
			});
		}
	});
</script>

<svelte:head>
	<title>Countdown Timer</title>
	<meta name="description" content="A simple, beautiful timer app for quiz nights." />
</svelte:head>

<div class="h-dvh w-full overflow-hidden bg-page text-white flex flex-col font-sans selection:bg-primary-500/30">
	<!-- Header -->
	<header class="flex justify-center items-start p-8 pt-12">
		<div class="flex flex-col items-center gap-1">
			<h1 class="text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
				Countdown Timer
			</h1>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1 flex flex-col px-6 pb-8 md:pb-20">
		<div class="flex-1 flex items-center justify-center scale-100 transition-transform relative z-0">
			<TimerDisplay {timer} />
		</div>
		
		<div class="w-full max-w-md mx-auto relative z-10">
			<Controls {timer} {soundManager} bind:isSettingsOpen />
		</div>

		<footer class="mt-6 text-center text-sm text-gray-500 relative z-10">
			<a href="/about" class="hover:text-white transition-colors">About</a>
			<span class="mx-2">&middot;</span>
			<span>&copy; {new Date().getFullYear()} Made by <a href="https://github.com/mares29" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">mares29</a></span>
		</footer>
	</main>

	<!-- Settings Modal -->
	<Settings 
		bind:isOpen={isSettingsOpen} 
		{timer} 
		{soundManager} 
	/>
</div>
