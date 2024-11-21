<script>
	import ButterflyInput from '$lib/UI/butterflyInput.svelte';
	import TheBigButton from '$lib/UI/theBigButton.svelte';
	import MainLayout from '$lib/UI/mainLayout.svelte';

	export let onFormSubmit;

	const handleSubmit = (event) => {
		event.preventDefault();

		// Collect form data
		const form = event.target;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		// Call the onFormSubmit callback with form data
		onFormSubmit({ email: data.Email });
	};
</script>

<MainLayout imgSrc="/left/newUser.jpeg">
	{#snippet aboveImage()}
		<div class="newUserPageAboveImage">
			<h1>Create Your Account</h1>
			<h4>& secure your spot</h4>
			<p>
				Please fill in the fields below with your information. Once you submit,
				we'll send a One-Time Password (OTP) to the email address you provided.
				This OTP is needed to verify your account, so make sure to check your email (and your spam/junk folder, just in case).
				After verification, you'll receive access to your account.
			</p>
		</div>
	{/snippet}
	{#snippet right()}
		<form class="newUserPageRight" onsubmit={handleSubmit}>
			<ButterflyInput name="Name" placeholder="Captain Jack Sparrow" type="text" required={true} pattern="^\S+\s+\S+.*$" />
			<ButterflyInput name="Email" placeholder="Captain@JackSparrow.lk" type="email" required={true} />
			<span>
				<ButterflyInput name="Birthday" placeholder="31/02/2000" type="date" required={true} min="1994-01-01" max="2014-12-31" />
				<ButterflyInput name="Gender" placeholder="M/F" type="text" required={true} pattern="[mMfF]" />
			</span>
			<ButterflyInput name="Whatsapp Number" placeholder="+94123456789" type="tel" required={true} />
			<ButterflyInput name="School" placeholder="School Name, Location" type="text" required={true} />
			<TheBigButton title="Create Your Account" type="submit" />
		</form>
	{/snippet}
</MainLayout>
