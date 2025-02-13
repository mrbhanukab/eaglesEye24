<script>
	const props = $props();
</script>

{#if props.type === "submit"}
	<div class="relative group w-full">
		<button
			class="relative inline-block p-px font-semibold leading-6 text-white bg-neutral-900 shadow-2xl cursor-pointer rounded-2xl shadow-emerald-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-emerald-600 w-full"
			onclick={props.onclick}
		>
      <span
				class="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 w-full"
			></span>
			<span
				class="relative z-10 px-6 py-3 rounded-2xl bg-neutral-950 w-full flex justify-between items-center space-x-3">
          <span
						class="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300"
					>{props.title}</span
					>
          <svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-7 h-7 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300"
					>
            <path
							d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
						></path>
          </svg>
      </span>
		</button>
	</div>

{:else}
	<a
		{...props}
		class="group/button relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gray-800/25 px-6 py-2 text-base font-semibold text-white/80 transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
	>
		<span class="text-lg">{props.title}</span>
		<span
			class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
		>
				<span class="relative h-full w-10 bg-white/20"></span>
			</span>
	</a>
{/if}