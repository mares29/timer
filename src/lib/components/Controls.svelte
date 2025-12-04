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
</script>

<div class="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
	{#if timer.status === 'running'}
		<button
			onclick={() => timer.pause()}
			class="col-span-2 bg-[#1e1e2d] hover:bg-[#2d2d3f] text-white font-medium py-4 px-8 rounded-full shadow-lg border border-white/5 transform transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
		>
			<div class="w-3 h-3 rounded-sm bg-yellow-500"></div>
			Pause
		</button>
	{:else}
		<button
			onclick={() => {
				soundManager?.prepare();
				timer.start();
			}}
			disabled={timer.status === 'finished'}
			class="col-span-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-4 px-8 rounded-full shadow-lg shadow-purple-500/20 transform transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
		>
			{#if timer.status === 'paused'}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
				</svg>
				Resume
			{:else}
				Start Timer
			{/if}
		</button>
	{/if}

	<button
		onclick={() => timer.reset()}
		disabled={timer.status === 'idle'}
		class="col-start-1 col-end-3 mt-2 text-gray-500 hover:text-white text-sm font-medium py-2 px-4 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
	>
		Reset
	</button>
</div>
