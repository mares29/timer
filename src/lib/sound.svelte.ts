export class SoundManager {
	#audioContext: AudioContext | null = null;
	#muted = $state(false);

	constructor() {
		// Initialize on first user interaction ideally, but we can setup the class
	}

	get muted() {
		return this.#muted;
	}

	set muted(value: boolean) {
		this.#muted = value;
	}

	toggleMute() {
		this.#muted = !this.#muted;
	}

	async prepare() {
		await this.#init();
	}

	async #init() {
		if (!this.#audioContext) {
			this.#audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		}
		if (this.#audioContext.state === 'suspended') {
			await this.#audioContext.resume();
		}
		return this.#audioContext;
	}

	async playTick() {
		if (this.#muted) return;
		
		const ctx = await this.#init();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'sine';
		osc.frequency.setValueAtTime(800, ctx.currentTime);
		osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

		gain.gain.setValueAtTime(0.1, ctx.currentTime);
		gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.start();
		osc.stop(ctx.currentTime + 0.05);
	}

	async playAlarm() {
		if (this.#muted) return;

		const ctx = await this.#init();
		
		// --- Tone 1 ---
		const osc1 = ctx.createOscillator();
		const gain1 = ctx.createGain();
		
		osc1.type = 'sine';
		osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
		
		gain1.gain.setValueAtTime(0.001, ctx.currentTime);
		gain1.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.03);
		gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
		
		osc1.connect(gain1);
		gain1.connect(ctx.destination);
		
		osc1.start();
		osc1.stop(ctx.currentTime + 0.5);
		
		// --- Tone 2 (slightly higher) ---
		const osc2 = ctx.createOscillator();
		const gain2 = ctx.createGain();
		
		osc2.type = 'sine';
		osc2.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.05); // C6
		
		gain2.gain.setValueAtTime(0.001, ctx.currentTime + 0.05);
		gain2.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.08);
		gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
		
		osc2.connect(gain2);
		gain2.connect(ctx.destination);
		
		osc2.start(ctx.currentTime + 0.05);
		osc2.stop(ctx.currentTime + 0.55);
	}
}
