<script>
	import Input from '$lib/UI/Input.svelte';
	import BigButton from '$lib/UI/BigButton.svelte';

	let { switchToRegister, onsubmit } = $props();
</script>

<form class="flex flex-col mt-5" onsubmit={onsubmit}>
	<Input lable="Email" name="email" placeholder="Captain@JackSparrow.lk" required={true} type="email" />

	<div class="flex flex-col sm:flex-row items-center justify-between gap-10 mt-6">
		<BigButton title="Login" type="submit" />

		<p class="mt-4 text-sm text-gray-500 sm:mt-0">
			First Time Here?
			<button class="text-gray-600 underline" onclick={switchToRegister} type="button">Create an account</button>
		</p>
	</div>
</form>