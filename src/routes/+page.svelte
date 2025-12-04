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
	<title>Quiz Timer</title>
	<meta name="description" content="A simple, beautiful timer app for quiz nights." />
</svelte:head>

<div class="min-h-screen bg-[#0B0B15] text-white flex flex-col font-sans selection:bg-purple-500/30">
	<!-- Header -->
	<header class="flex justify-between items-start p-8 pt-12">
		<div class="flex flex-col gap-1">
			<span class="text-gray-400 text-sm tracking-wide font-medium">Welcome back</span>
			<h1 class="text-3xl font-bold text-white tracking-tight">Quiz Night</h1>
		</div>
		<button
			onclick={() => isSettingsOpen = true}
			class="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 p-[2px] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
			aria-label="Open settings"
		>
			<div class="w-full h-full rounded-full bg-[#0B0B15] flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
				</svg>
			</div>
		</button>
	</header>

	<!-- Main Content -->
	<main class="flex-1 flex flex-col items-center justify-center px-6 gap-16 pb-20">
		<div class="scale-100 md:scale-110 transition-transform">
			<TimerDisplay {timer} />
		</div>
		
		<div class="w-full max-w-md space-y-6">
			<Controls {timer} {soundManager} />
			
			<!-- Info Card style placeholder -->
			<div class="bg-[#161622] rounded-2xl p-4 flex items-center gap-4 border border-white/5">
				<div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
					<div class="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
				</div>
				<div class="flex-1">
					<h3 class="text-white font-medium">Current Question</h3>
					<p class="text-gray-400 text-sm">Keep focused on the timer</p>
				</div>
			</div>
		</div>
	</main>

	<!-- Settings Modal -->
	<Settings 
		bind:isOpen={isSettingsOpen} 
		{timer} 
		{soundManager} 
	/>
</div>
