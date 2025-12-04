export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

export class QuizTimer {
	// Configuration
	#duration = $state(30);
	
	get duration() {
		return this.#duration;
	}

	set duration(value: number) {
		this.#duration = value;
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('timer_duration', String(value));
		}
	}
	
	// State
	timeLeft = $state(30);
	progress = $state(1);
	status = $state<TimerStatus>('idle');
	
	// Internal
	#interval: number | null = null;
	#startTime: number = 0;
	#endTime: number = 0;
	#pausedTime: number = 0;

	constructor(initialDuration = 30) {
		let startDuration = initialDuration;
		
		if (typeof localStorage !== 'undefined') {
			const saved = localStorage.getItem('timer_duration');
			if (saved) {
				const parsed = parseInt(saved);
				if (!isNaN(parsed)) {
					startDuration = parsed;
				}
			}
		}

		this.#duration = startDuration;
		this.timeLeft = startDuration;
	}

	setDuration(seconds: number) {
		if (this.status !== 'idle') return;
		this.duration = seconds;
		this.timeLeft = seconds;
		this.progress = 1;
	}

	start() {
		if (this.status === 'running') return;

		if (this.status === 'finished' || this.timeLeft <= 0) {
			this.reset();
		}

		if (this.status === 'paused') {
			// Resume
			const now = Date.now();
			this.#endTime = now + (this.timeLeft * 1000);
		} else {
			// Start fresh
			const now = Date.now();
			this.#startTime = now;
			this.#endTime = now + (this.duration * 1000);
		}

		this.status = 'running';
		
		// Clear existing interval just in case
		if (this.#interval) clearInterval(this.#interval);

		// Update frequently for smooth progress
		this.#interval = setInterval(() => {
			const now = Date.now();
			const msRemaining = this.#endTime - now;
			const remainingSeconds = Math.ceil(msRemaining / 1000);
			
			// Calculate progress (0 to 1)
			this.progress = Math.max(0, msRemaining / (this.duration * 1000));

			if (remainingSeconds <= 0) {
				this.timeLeft = 0;
				this.progress = 0;
				this.finish();
			} else {
				this.timeLeft = remainingSeconds;
			}
		}, 16) as unknown as number; // ~60fps updates
	}

	pause() {
		if (this.status !== 'running') return;
		
		if (this.#interval) {
			clearInterval(this.#interval);
			this.#interval = null;
		}
		
		this.status = 'paused';
	}

	reset() {
		if (this.#interval) {
			clearInterval(this.#interval);
			this.#interval = null;
		}
		
		this.timeLeft = this.duration;
		this.progress = 1;
		this.status = 'idle';
	}

	finish() {
		if (this.#interval) {
			clearInterval(this.#interval);
			this.#interval = null;
		}
		this.status = 'finished';
	}
}
