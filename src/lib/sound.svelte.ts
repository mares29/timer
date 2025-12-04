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
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();

		osc.type = 'square';
		osc.frequency.setValueAtTime(440, ctx.currentTime);
		osc.frequency.setValueAtTime(440, ctx.currentTime + 0.1);
		osc.frequency.setValueAtTime(440, ctx.currentTime + 0.2);
		osc.frequency.setValueAtTime(440, ctx.currentTime + 0.3);

		// Envelope
		gain.gain.setValueAtTime(0.2, ctx.currentTime);
		gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.4);
		gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

		osc.connect(gain);
		gain.connect(ctx.destination);

		osc.start();
		osc.stop(ctx.currentTime + 0.8);
	}
}
