<script>
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>About - Countdown Timer</title>
	<meta name="description" content="Learn more about Countdown Timer, the ultimate tool for quizzes, productivity, and time management. Features customizable duration, sound effects, and a modern dark interface." />
</svelte:head>

<div class="min-h-screen bg-page text-white flex flex-col font-sans selection:bg-primary-500/30 p-8">
	<div class="max-w-3xl mx-auto w-full pt-12 pb-20" in:fade={{ duration: 300 }}>
		<nav class="mb-12">
			<a href="/" class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				Back to Timer
			</a>
		</nav>

		<header class="mb-12">
			<h1 class="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
				About Countdown Timer
			</h1>
			<p class="text-xl text-gray-400 leading-relaxed max-w-2xl">
				A simple, elegant, and precise timer designed for modern needs. Whether you're hosting a quiz night, managing a workout, or focusing on work, this timer keeps you on track.
			</p>
		</header>

		<main class="space-y-16">
			<section class="grid md:grid-cols-2 gap-8">
				<div class="bg-surface p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
					<div class="w-12 h-12 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h2 class="text-xl font-semibold text-white mb-3">Precision Timing</h2>
					<p class="text-gray-400 leading-relaxed">
						Accurate to the second with a beautiful circular progress display that gives you a quick visual cue of the remaining time.
					</p>
				</div>

				<div class="bg-surface p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
					<div class="w-12 h-12 bg-secondary-500/20 rounded-2xl flex items-center justify-center mb-6">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
						</svg>
					</div>
					<h2 class="text-xl font-semibold text-white mb-3">Immersive Audio</h2>
					<p class="text-gray-400 leading-relaxed">
						Optional ticking sounds to build suspense and a clear alarm when time is up. Fully adjustable in settings.
					</p>
				</div>

				<div class="bg-surface p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
					<div class="w-12 h-12 bg-success-500/20 rounded-2xl flex items-center justify-center mb-6">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
						</svg>
					</div>
					<h2 class="text-xl font-semibold text-white mb-3">Customizable</h2>
					<p class="text-gray-400 leading-relaxed">
						Set any duration you need. The interface adapts to your needs, whether it's a 30-second sprint or a 1-hour session.
					</p>
				</div>

				<div class="bg-surface p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
					<div class="w-12 h-12 bg-tertiary-500/20 rounded-2xl flex items-center justify-center mb-6">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-tertiary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
						</svg>
					</div>
					<h2 class="text-xl font-semibold text-white mb-3">Modern Design</h2>
					<p class="text-gray-400 leading-relaxed">
						Built with Svelte 5 and Tailwind CSS for a smooth, performant, and visually stunning experience on any device.
					</p>
				</div>
			</section>

			<section class="border-t border-white/10 pt-12">
				<h3 class="text-2xl font-bold text-white mb-6">Why Countdown Timer?</h3>
				<div class="prose prose-invert prose-lg max-w-none text-gray-400">
					<p>
						In a world of distractions, staying focused is a superpower. We built Countdown Timer to be the simplest, most effective way to manage your time blocks.
					</p>
					<p>
						Perfect for:
					</p>
					<ul class="grid sm:grid-cols-2 gap-4 list-none pl-0 mt-6">
						<li class="flex items-center gap-3">
							<span class="w-2 h-2 rounded-full bg-primary-500"></span>
							Quiz Nights & Games
						</li>
						<li class="flex items-center gap-3">
							<span class="w-2 h-2 rounded-full bg-secondary-500"></span>
							Pomodoro Sessions
						</li>
						<li class="flex items-center gap-3">
							<span class="w-2 h-2 rounded-full bg-success-500"></span>
							Exercise Intervals
						</li>
						<li class="flex items-center gap-3">
							<span class="w-2 h-2 rounded-full bg-tertiary-500"></span>
							Presentations & Pitching
						</li>
					</ul>
				</div>
			</section>
		</main>

		<footer class="mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
			<p>&copy; {new Date().getFullYear()} Countdown Timer. All rights reserved.</p>
		</footer>
	</div>
</div>
