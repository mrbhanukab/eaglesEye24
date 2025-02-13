<script>
	import { onMount } from 'svelte';
	import BigButton from '$lib/UI/BigButton.svelte';

	const { phrase, onsubmit, otp } = $props();

	let OTPInputs = [];

	onMount(() => {
		OTPInputs = Array.from(document.querySelectorAll('.otp input'));
	});

	function handleKeyUp(event, index) {
		const { keyCode, target } = event;
		const value = target.value;

		otp[index] = value;

		if (keyCode === 8 || keyCode === 37) {
			if (index > 0 && !value) {
				OTPInputs[index - 1].focus();
			}
		} else if (value && ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 105) || keyCode === 39)) {
			if (index < OTPInputs.length - 1) {
				OTPInputs[index + 1].focus();
			}
		}
	}
</script>

<svelte:head>
	<style>
      /* Chrome, Safari, Edge, Opera */
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }

      /* Firefox */
      input[type=number] {
          -moz-appearance: textfield;
      }
	</style>
</svelte:head>

<form
	class="flex flex-col gap-3 mt-10 items-center justify-center relative rounded-xl p-4 bg-white [box-shadow:var(--shadow)]"
	onsubmit={onsubmit}>
	<h6 class="text-2xl font-bold">OTP Verification</h6>

	<div class="my-6 w-full grid grid-flow-col grid-cols-6 items-center justify-center justify-items-center otp">
		{#each Array(6) as _, i}
			<input
				autocomplete="one-time-code"
				class="aria-[disabled='true']:cursor-not-allowed aria-[disabled='true']:opacity-50 block focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white [box-shadow:var(--shadow)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-0 placeholder:select-none"
				maxlength="1"
				placeholder="○"
				spellcheck="false"
				type="number"
				min="0"
				max="9"
				pattern="\d*"
				onkeyup={(event) => handleKeyUp(event, i)}
			/>
		{/each}
	</div>

	<span class="text-zinc-500 text-[12px] text-center">
	    Please enter the 6-digits one time password (OTP) that we sent to your email. (Should Receive From Appwrite & it must contains <strong
		class="text-red-400 underline font-bold">'{phrase || 'loading'}'</strong> phrase)
	  </span>

	<BigButton title="Verify Account" type="submit" />
</form>