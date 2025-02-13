<script>
	import '../app.css';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	let { children } = $props();

	let curzr;
	let pointerX = 0;
	let pointerY = 0;
	let cursorSize = 0;

	function move(event, root) {
		if (!curzr) return;

		if (event.target.localName === 'button' ||
			event.target.localName === 'a' ||
			event.target.onclick !== null ||
			event.target.className.includes('curzr-hover')) {
			hover(40);
		} else {
			hoverout(40);
		}

		pointerX = event.pageX + root.getBoundingClientRect().x;
		pointerY = event.pageY + root.getBoundingClientRect().y;

		curzr.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
	}

	function click() {
		if (!curzr) return;

		curzr.style.transform += ` scale(0.75)`;
		setTimeout(() => {
			curzr.style.transform = curzr.style.transform.replace(` scale(0.75)`, '');
		}, 35);
	}

	function hover(radius) {
		curzr.style.width = curzr.style.height = `${radius}px`;
		curzr.style.top = curzr.style.left = `${radius / -2}px`;
	}

	function hoverout() {
		curzr.style.width = curzr.style.height = `${cursorSize}px`;
		curzr.style.top = curzr.style.left = `${cursorSize / -2}px`;
	}

	onMount(() => {
		if (browser) {
			document.body.style.userSelect = 'none';
			document.querySelectorAll('*').forEach(element => {
				element.setAttribute('draggable', 'false');
			});
			if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				cursorSize = Number(getComputedStyle(curzr).getPropertyValue('--size').slice(0, -2));
				curzr.removeAttribute('hidden');
				document.body.addEventListener('mousemove', (event) => move(event, document.body));
				document.body.addEventListener('click', click);
			} else {
				curzr.remove();
			}
		}
	});

	onDestroy(() => {
		if (browser) {
			document.body.removeEventListener('mousemove', (event) => move(event, document.body));
			document.body.removeEventListener('click', click);
		}
	});
</script>

<svelte:head>
	<style>
      .curzr {
          --size: 20px;
          --delay: 180ms;
          --body-color: rgba(242, 245, 248, 0.65);
          --outline-color: rgba(134, 134, 134, 0.51);

          box-sizing: border-box;
          position: fixed;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 49;
          width: var(--size);
          height: var(--size);
          transition: 200ms, transform var(--delay);
          background-color: #fff0;
          box-shadow: 0 0 0 1.25px var(--body-color), 0 0 0 2.25px var(--outline-color);
          border-radius: 50%;
          user-select: none;
          pointer-events: none;
      }

      .curzr .dot {
          box-sizing: border-box;
          position: fixed;
          top: 50%;
          left: 50%;
          z-index: 2147483647;
          width: 4px;
          height: 4px;
          background-color: var(--body-color);
          box-shadow: 0 0 0 1px var(--outline-color);
          border-radius: 50%;
          user-select: none;
          pointer-events: none;
      }
	</style>
</svelte:head>

<div bind:this={curzr} class="curzr" hidden>
	<div class="dot"></div>
</div>

<div class="flex flex-col items-center cursor-crosshair">

	{@render children()}

</div>
