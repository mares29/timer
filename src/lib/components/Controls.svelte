<script lang="ts">
	import type { QuizTimer } from '$lib/timer.svelte';
	import type { SoundManager } from '$lib/sound.svelte';

	let { 
		timer,
		soundManager,
		isSettingsOpen = $bindable(false)
	}: { 
		timer: QuizTimer;
		soundManager?: SoundManager;
		isSettingsOpen?: boolean;
	} = $props();
</script>

<div class="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
	{#if timer.status === 'running'}
		<button
			onclick={() => timer.pause()}
			class="col-span-2 bg-surface-hover hover:bg-surface-active text-white font-medium py-4 px-8 rounded-full shadow-lg border border-white/5 transform transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
		>
			<div class="w-3 h-3 rounded-sm bg-warning-500">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
				</svg>
			</div>
			Pause
		</button>
	{:else}
		<button
			onclick={() => {
				soundManager?.prepare();
				timer.start();
			}}
			class="col-span-2 bg-gradient-to-br from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-medium py-4 px-8 rounded-full shadow-[0_0_15px_color-mix(in_srgb,var(--color-primary-600),transparent_50%)] hover:shadow-[0_0_25px_color-mix(in_srgb,var(--color-primary-600),transparent_30%)] focus:shadow-[0_0_25px_color-mix(in_srgb,var(--color-primary-600),transparent_30%)] focus:outline-none focus:ring-2 focus:ring-primary-400/50 transform transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
		>
			{#if timer.status === 'paused'}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
				</svg>
				Resume
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
				</svg>
				Start Timer
			{/if}
		</button>
	{/if}

	<button
		onclick={() => timer.reset()}
		disabled={timer.status === 'idle'}
		class="col-span-1 mt-2 text-gray-500 hover:text-white text-sm font-medium py-2 px-4 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
		</svg>
		Reset
	</button>

	<button
		onclick={() => isSettingsOpen = true}
		class="col-span-1 mt-2 text-gray-500 hover:text-white text-sm font-medium py-2 px-4 rounded-full transition-colors cursor-pointer flex items-center justify-center gap-2"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
		</svg>
		Settings
	</button>
</div>
