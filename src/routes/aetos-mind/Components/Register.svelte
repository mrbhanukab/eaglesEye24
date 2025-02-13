<script>
	import Input from '$lib/UI/Input.svelte';
	import BigButton from '$lib/UI/BigButton.svelte';

	let { switchToLogin, onsubmit } = $props();
</script>

<form class="flex flex-col gap-3 mt-5 sm:mt-0" onsubmit={onsubmit}>
	<Input lable="Name" name="name" pattern="^\S+\s+\S+.*$" placeholder="Captain Jack Sparrow" required={true}
				 type="text" />
	<Input lable="Email" name="email" placeholder="Captain@JackSparrow.lk" required={true} type="email" />

	<div class="flex sm:flex-row flex-col justify-between gap-2">
		<Input lable="Birthday" max="2015-12-31" min="1993-01-01" name="birthday" placeholder="31/02/2000" required={true}
					 type="date" />
		<Input lable="Gender" name="gender" pattern="[mMfF]" placeholder="M/F" required={true} type="text" />
	</div>

	<Input lable="Whatsapp" name="whatsapp" placeholder="+94123456789" required={true} type="tel" value="+94" />
	<Input lable="School-University" name="school" placeholder="School/University Name, Location" required={true}
				 type="text" />

	<div class="flex flex-col sm:flex-row items-center justify-between gap-10 mt-5">
		<BigButton title="Create Account" type="submit" />

		<p class="mt-4 text-sm text-gray-500 sm:mt-0">
			Already have an account?
			<button class="text-gray-600 underline" onclick={switchToLogin} type="button">Log in</button>
		</p>
	</div>
</form>