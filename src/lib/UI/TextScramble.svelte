<script>
	import { onMount } from 'svelte';

	class TextScramble {
		constructor(el) {
			this.el = el;
			this.chars = '!<>-_\\/[]{}—=+*^?#________';
			this.update = this.update.bind(this);
		}

		setText(newText) {
			const oldText = this.el.innerText;
			const length = Math.max(oldText.length, newText.length);
			const promise = new Promise((resolve) => (this.resolve = resolve));
			this.queue = [];
			for (let i = 0; i < length; i++) {
				const from = oldText[i] || '';
				const to = newText[i] || '';
				const start = Math.floor(Math.random() * 40);
				const end = start + Math.floor(Math.random() * 40);
				this.queue.push({ from, to, start, end });
			}
			cancelAnimationFrame(this.frameRequest);
			this.frame = 0;
			this.update();
			return promise;
		}

		update() {
			let output = '';
			let complete = 0;
			for (let i = 0, n = this.queue.length; i < n; i++) {
				let { from, to, start, end, char } = this.queue[i];
				if (this.frame >= end) {
					complete++;
					output += to;
				} else if (this.frame >= start) {
					if (!char || Math.random() < 0.28) {
						char = this.randomChar();
						this.queue[i].char = char;
					}
					output += `<span class="dud">${char}</span>`;
				} else {
					output += from;
				}
			}
			this.el.innerHTML = output;
			if (complete === this.queue.length) {
				this.resolve();
			} else {
				this.frameRequest = requestAnimationFrame(this.update);
				this.frame++;
			}
		}

		randomChar() {
			return this.chars[Math.floor(Math.random() * this.chars.length)];
		}
	}

	let phrases = [
		'There comes a moment in every aviator’s journey',
		'when the engines hum, the runway fades',
		'and a choice must be made',
		'stay grounded in the safety of the known',
		'or push the throttle forward',
		'piercing the clouds and',
		'chasing destiny across the endless sky'];

	let el;
	let fx;

	onMount(() => {
		fx = new TextScramble(el);
		let counter = 0;
		const next = () => {
			fx.setText(phrases[counter]).then(() => {
				setTimeout(next, 1500);
			});
			counter = (counter + 1) % phrases.length;
		};
		next();
	});
</script>

<style>
    .container {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .text {
        font-weight: 100;
        color: #FAFAFA;
    }
</style>

<div class="container mt-4 text-xl">
	<div bind:this={el} class="text"></div>
</div>