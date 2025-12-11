<script lang="ts">
	import type { QuizTimer } from '$lib/timer.svelte';
	import type { SoundManager } from '$lib/sound.svelte';
	import * as Drawer from "$lib/components/ui/drawer/index.js";
	import { Slider } from "$lib/components/ui/slider/index.js";
	import Volume2 from "@lucide/svelte/icons/volume-2";
	import Moon from "@lucide/svelte/icons/moon";
	import { mode, toggleMode } from 'mode-watcher';

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

<Drawer.Root bind:open={isOpen}>
	<Drawer.Content class="bg-surface border-border">
		<div class="mx-auto w-full max-w-md">
			<Drawer.Header class="flex justify-between items-center mb-2">
				<Drawer.Title class="text-2xl font-bold text-foreground text-left">Settings</Drawer.Title>
			</Drawer.Header>

			<div class="px-4 pb-12 space-y-10">
				<!-- Duration -->
				<div>
					<div class="flex justify-between items-end mb-4">
						<label for="duration-slider" class="block text-sm font-medium text-muted-foreground">
							Duration
						</label>
						<span class="text-foreground font-bold text-2xl tabular-nums">{timer.duration}<span class="text-sm text-muted-foreground font-normal ml-1">sec</span></span>
					</div>
					
					<Slider
						id="duration-slider"
						type="single"
						min={5}
						max={120}
						step={5}
						value={timer.duration}
						onValueChange={(v) => timer.setDuration(v)}
						class="w-full"
						disabled={timer.status !== 'idle'}
					/>
					
					<div class="flex gap-3 mt-6 overflow-x-auto pb-2 no-scrollbar">
						{#each presets as preset (preset)}
							<button
								onclick={() => timer.setDuration(preset)}
								disabled={timer.status !== 'idle'}
								class="px-5 py-3 rounded-2xl text-sm font-medium transition-all cursor-pointer min-w-16
									{timer.duration === preset 
										? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
										: 'bg-surface-hover text-muted-foreground hover:bg-surface-active-alt border border-border'}
									disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{preset}
							</button>
						{/each}
					</div>
				</div>

				<!-- Sound -->
				<div class="flex items-center justify-between p-4 bg-surface-hover rounded-2xl border border-border">
					<div class="flex items-center gap-4">
						<div class="p-3 bg-primary-500/20 rounded-xl text-primary-400">
							<Volume2 class="h-6 w-6" />
						</div>
						<div>
							<p class="font-medium text-foreground">Sound Effects</p>
							<p class="text-xs text-muted-foreground">Ticks and alarm</p>
						</div>
					</div>
					<button
						onclick={() => soundManager.toggleMute()}
						aria-label={soundManager.muted ? "Unmute sounds" : "Mute sounds"}
						class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-surface cursor-pointer
							{!soundManager.muted ? 'bg-primary-600' : 'bg-muted'}"
					>
						<span
							class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm
								{!soundManager.muted ? 'translate-x-6' : 'translate-x-1'}"
						></span>
					</button>
				</div>

				<!-- Theme -->
				<div class="flex items-center justify-between p-4 bg-surface-hover rounded-2xl border border-border">
					<div class="flex items-center gap-4">
						<div class="p-3 bg-secondary-500/20 rounded-xl text-secondary-400">
							<Moon class="h-6 w-6" />
						</div>
						<div>
							<p class="font-medium text-foreground">Dark Mode</p>
							<p class="text-xs text-muted-foreground">Toggle light/dark theme</p>
						</div>
					</div>
					<button
						onclick={() => toggleMode()}
						aria-label={mode.current === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
						class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-surface cursor-pointer
							{mode.current === 'dark' ? 'bg-primary-600' : 'bg-muted'}"
					>
						<span
							class="inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm
								{mode.current === 'dark' ? 'translate-x-6' : 'translate-x-1'}"
						></span>
					</button>
				</div>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
