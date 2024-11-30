<script>
	import ButterflyInput from '$lib/UI/butterflyInput.svelte';
	import TheBigButton from '$lib/UI/theBigButton.svelte';
	import MainLayout from '$lib/UI/mainLayout.svelte';
	import Error from '$lib/UI/error.svelte';

	let { onFormSubmit, imgSrc } = $props();
	let error = $state([]);
	let submitting = $state(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		error = [];
		submitting = true;

		try {
			const response = await fetch('/user/NewUser', {
				method: 'POST',
				body: formData
			});
			error = (await response.json()).errors;
			if(error.length === 0) {
				onFormSubmit(Object.fromEntries(formData.entries()));
			}
			submitting = false;
		} catch (err) {
			error = err;
		}
	};

</script>

<Error error={error} />
<MainLayout {imgSrc}>
	{#snippet aboveImage()}
		<div class="newUserPageAboveImage">
			<h1>Create Your Account</h1>
			<h4>& secure your spot</h4>
			<p>Please fill in the fields below with your information. Once submitted, we'll send a One-Time Password (OTP) to
				the email address you provide. Check your email (including your spam/junk folder) for the OTP, which is required
				to verify your account. After verification, you'll gain access to your account.</p>
		</div>
	{/snippet}
	{#snippet right()}
		<form class="newUserPageRight" onsubmit={handleSubmit}>
			<ButterflyInput name="Name" placeholder="Captain Jack Sparrow" type="text" required={true}
											pattern="^\S+\s+\S+.*$" disabled={submitting}/>
			<ButterflyInput name="Email" placeholder="Captain@JackSparrow.lk" type="email" required={true} disabled={submitting}/>
			<span>
    <ButterflyInput name="Birthday" placeholder="31/02/2000" type="date" required={true} min="1994-01-01"
										max="2014-12-31" disabled={submitting}/>
    <ButterflyInput name="Gender" placeholder="M/F" type="text" required={true} pattern="[mMfF]" disabled={submitting}/>
   </span>
			<ButterflyInput name="Whatsapp" placeholder="+94123456789" type="tel" value="+94" required={true} disabled={submitting}/>
			<ButterflyInput name="School-University" placeholder="School/University Name, Location" type="text"
											required={true} disabled={submitting}/>
			<TheBigButton title={submitting ? "Verifying Data ..." : "Create Your Account"} type="submit" />
		</form>
	{/snippet}
</MainLayout>