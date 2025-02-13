<script>
	const props = $props();

	let showError = $state(true);

	function handleClose() {
		showError = false;
	}
</script>

{#if showError}
	<div
		class="fixed bottom-2 right-2 z-50 flex items-center justify-between w-fit h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]">
		<div class="flex gap-2">
			<div class="text-[#d65563] backdrop-blur-xl p-1 rounded-lg">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
						 xmlns="http://www.w3.org/2000/svg">
					<path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" stroke-linecap="round"
								stroke-linejoin="round"></path>
				</svg>
			</div>
			<div>
				<p class="text-white">Error!</p>
				<p class="text-gray-500">{props.error}</p>
			</div>
		</div>
		<button
			aria-label="close"
			class="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
			onclick={handleClose}
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
					 xmlns="http://www.w3.org/2000/svg">
				<path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>
		</button>
	</div>
{/if}