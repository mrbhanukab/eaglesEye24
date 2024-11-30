<script>
	import '../NewUser/NewUser.css';
	import MainLayout from '$lib/UI/mainLayout.svelte';
	import ButterflyInput from '$lib/UI/butterflyInput.svelte';
	import TheBigButton from '$lib/UI/theBigButton.svelte';
	import { onMount } from 'svelte';
	import { user } from '$lib/AppWrite/user.js';
	import Loading from '$lib/UI/loading.svelte';
	import { error } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import Error from '$lib/UI/error.svelte';

	let loading = $state(true);
	let showOTP = $state(false);
	let image = $state('https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e4100376276f370/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85');
	let OTPInputs = [];
	let otp = ['', '', '', '', '', ''];
	let userInputs;
	let session = $state(null);
	let errs = $state([]);
	let verifying = $state(false);

	async function downloadImage() {
		try {
			const response = await fetch(image);

			if (!response.ok) error(404, `Image Not Found! [${image}]`);

			const blob = await response.blob();

			image = URL.createObjectURL(blob);
		} catch (error) {
			console.error('Error downloading image:', error);
		}
	}

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

	onMount(async () => {
		await downloadImage();
		setTimeout(() => loading = false, 1500);
	});

	$effect(() => OTPInputs = Array.from(document.querySelectorAll('.otp input')));


	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		userInputs = Object.fromEntries(data.entries());
		verifying = true;

		if (showOTP) {
			try {
				await user.login(session.userId, otp.join(''));
				await goto('/portal');
			} catch (error) {
				if (error.code === 401) {
					errs.push('Invalid OTP. Please try again.');
				} else {
					errs.push(error.message);
				}
				errs = [];
			}
		}

		if (!showOTP) {
			const response = await fetch('/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({ Email: userInputs.Email })
			});
			if (!response.ok) {
				errs.push('Failed to send OTP. Please try again later.');
			} else {
				const json = await response.json();
				errs = json.errors || [];
			}
			console.log('errs:', errs.length);
			if (errs.length === 0){
				session = await user.createOtp(userInputs.Email)
				showOTP = true;
			}
		}
		verifying = false;
	};

</script>

<svelte:head>
	<title>EaglesEye24 | Login</title>
</svelte:head>

{#if loading}
	<Loading />
{:else}
	<Error error={errs} />
	<MainLayout imgSrc={image}>
		{#snippet aboveImage()}
			<div class="newUserPageAboveImage">
				<h1>Login to Your Account</h1>
				<h4>Enter your email, and we will send you an OTP</h4>
				<p>Enter your email address to log in. After clicking "Send me the OTP," you'll receive a 6-digit One-Time
					Password via email. Check your Spam/Junk folder if needed. Ensure the email contains the security phrase at
					the bottom before entering the OTP</p>
			</div>
		{/snippet}
		{#snippet right()}
			<form class="newUserPageRight" style="justify-content: center !important; gap: 2vh" onsubmit={handleSubmit}>
				<ButterflyInput name={!showOTP ? "Email" : "Enter the OTP You Received"} type="email" disabled={showOTP} />
				{#if showOTP}
					<div class="otp">
						{#each Array(6) as _, i}
							<ButterflyInput
								type="number"
								maxlength="1"
								style="width: 3.5vw; height: 3.5vw; font-size: 2vw;"
								disabled={verifying}
								onkeyup={(event) => handleKeyUp(event, i)}
							/>
						{/each}
					</div>
					<h3 class="aboutOTP">
						The email you received must be from the <b style="font-weight: bolder; text-decoration: underline">EaglesEye24</b>
						team and contain the phrase <b
						style="font-weight: bolder; text-decoration: underline; color: red">'{session.phrase}.'</b> Can't find it?
						Check your Junk/Spam folder—it might have taken a detour! This OTP will expire in 15 minutes.
					</h3>
				{/if}
				<TheBigButton
					title={verifying ? "Verifying ..." : !showOTP ? "Send Me the OTP" : "Log Me In"}
					type="submit"
					disabled={verifying}
				/>
			</form>
		{/snippet}
	</MainLayout>
{/if}