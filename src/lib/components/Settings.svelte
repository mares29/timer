<script lang="ts">
	import type { QuizTimer } from '$lib/timer.svelte';
	import type { SoundManager } from '$lib/sound.svelte';
	import { fade, slide } from 'svelte/transition';

	let { 
		timer, 
		soundManager, 
		isOpen = $bindable(false) 
	}: { 
		timer: QuizTimer; 
		soundManager: SoundManager; 
		isOpen: boolean 
	} = $props();

	const presets = [10, 30, 60, 90, 120];
</script>

{#if isOpen}
	<div 
		class="fixed inset-0 bg-black/80 z-40 backdrop-blur-md"
		transition:fade
		onclick={() => isOpen = false}
		role="button"
		tabindex="0"
		aria-label="Close settings"
        onkeydown={(e) => { if(e.key === 'Escape') isOpen = false; }}
	></div>

	<div 
		class="fixed inset-x-0 bottom-0 z-50 bg-surface rounded-t-[2rem] shadow-2xl p-8 pb-12 max-h-[80vh] overflow-y-auto border-t border-white/10"
		transition:slide={{ axis: 'y', duration: 300 }}
	>
		<div class="flex justify-between items-center mb-8">
			<h2 class="text-2xl font-bold text-white">Settings</h2>
			<button 
				onclick={() => isOpen = false}
				class="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors cursor-pointer"
				aria-label="Close settings"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<div class="space-y-10">
			<!-- Duration -->
			<div>
				<div class="flex justify-between items-end mb-4">
					<label for="duration-slider" class="block text-sm font-medium text-gray-400">
						Duration
					</label>
					<span class="text-white font-bold text-2xl tabular-nums">{timer.duration}<span class="text-sm text-gray-500 font-normal ml-1">sec</span></span>
				</div>
				
				<input
					id="duration-slider"
					type="range"
					min="5"
					max="120"
					step="5"
					value={timer.duration}
					oninput={(e) => timer.setDuration(Number(e.currentTarget.value))}
					class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
					disabled={timer.status !== 'idle'}
				/>
				
				<div class="flex gap-3 mt-6 overflow-x-auto pb-2 no-scrollbar">
					{#each presets as preset (preset)}
						<button
							onclick={() => timer.setDuration(preset)}
							disabled={timer.status !== 'idle'}
							class="px-5 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer min-w-[4rem]
								{timer.duration === preset 
									? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
									: 'bg-surface-hover text-gray-400 hover:bg-surface-active-alt border border-white/5'}
								disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{preset}
						</button>
					{/each}
				</div>
			</div>

			<!-- Sound -->
			<div class="flex items-center justify-between p-4 bg-surface-hover rounded-2xl border border-white/5">
				<div class="flex items-center gap-4">
					<div class="p-3 bg-primary-500/20 rounded-xl text-primary-400">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
						</svg>
					</div>
					<div>
						<p class="font-medium text-white">Sound Effects</p>
						<p class="text-xs text-gray-400">Ticks and alarm</p>
					</div>
				</div>
				<button
					onclick={() => soundManager.toggleMute()}
					aria-label={soundManager.muted ? "Unmute sounds" : "Mute sounds"}
					class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-surface cursor-pointer
						{!soundManager.muted ? 'bg-primary-600' : 'bg-gray-700'}"
				>
					<span
						class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm
							{!soundManager.muted ? 'translate-x-6' : 'translate-x-1'}"
					></span>
				</button>
			</div>
		</div>
	</div>
{/if}
