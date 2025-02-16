<script>
	import { user } from '$lib/AppWrite/user.js';
	import { goto } from '$app/navigation';
	import Seo from '$lib/Seo.svelte';

	const { data } = $props();
	console.log('Data:', data);
	const session = data.session;
	const otherData = data.otherData;
	let view = $state('register');
	let errors = $state([]);
	let newSession = $state({});
	let otp = $state(['', '', '', '', '', '']); // Define the otp variable

	// Define formData and data globally
	let formData;
	let formDataEntries;

	function handleSwitchToRegister() {
		view = 'register';
	}

	function handleSwitchToLogin() {
		view = 'login';
	}

	async function getData(url = '', data = {}) {
		const queryParams = new URLSearchParams(data).toString();
		const response = await fetch(`${url}?${queryParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return response.json();
	}

	async function sendOTP(email) {
		try {
			newSession = await user.createOtp(email);
		} catch (error) {
			errors.push(error.message);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		formData = new FormData(event.target);
		formDataEntries = Object.fromEntries(formData.entries());
		formDataEntries.event = 'account';
		if (!formDataEntries.name) formDataEntries.action = 'login';
		else formDataEntries.action = 'register';

		try {
			errors = (await getData('/aetos-mind', formDataEntries)).errors;
			console.log('Response:', errors);
			if (errors.length === 0) {
				await sendOTP(formDataEntries.email);
				view = 'otp';
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}

	async function handleOTP(event) {
		event.preventDefault();
		errors = [];
		try {
			await user.login(newSession.userId, otp.join(''));
			if (formDataEntries.action === 'register')
				await user.createUser(formDataEntries, newSession, otp.join(''), '/aetos-mind');
			location.reload();
		} catch (error) {
			if (error.code === 401) {
				errors.push('Invalid OTP. Please try again.');
			} else {
				errors.push(error.message);
			}
		}
	}

	const logout = async () => {
		await user.logout();
		await goto('/');
	};
</script>

<svelte:head>
	<Seo
		description="Aetos Mind is an aviation-themed quiz competition under Eagles Eye 24, testing knowledge on aerospace and aviation. Organized by Isipathana College Aeronautical Club."
		title="Aetos Mind"
		url="/aetos-mind" />
</svelte:head>


{#if session != null}
	{#if otherData.aetosmind[0].value}
		<iframe
			src="https://docs.google.com/forms/d/e/1FAIpQLScpt2NMrJWaIScspy_HHB8rKMKBkwZjKdmqVVJuIE4UZXQ1Og/viewform?usp=pp_url&entry.194400790={otherData.account.aetosMind.team}&entry.1428200108={otherData.account.aetosMind['$id']}-InZlcmlmaWVkIg==&entry.1285790397={otherData.account.aetosMind.leader}&entry.1261356965={otherData.account['$id']}"
			title="Aetos Mind" allowfullscreen loading="eager" class="w-screen h-screen z-50"
			referrerpolicy="unsafe-url"></iframe>

	{:else}

		{#if otherData.account.aetosMind}
			{#await import("./Components/Invitation.svelte") then Invitation}
				<Invitation.default userData={otherData.account} />
			{/await}

		{:else}
			{#await import("./Components/CreateTeam.svelte") then CreateTeam}
				<CreateTeam.default userData={otherData.account} />
			{/await}
		{/if}

	{/if}

	<button onclick={logout} aria-label="logout" class="fixed bottom-2 right-2 p-2 bg-white rounded-full">
		<svg width="10px" height="10px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
			<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				<path d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#1C274C" stroke-width="1.5"
							stroke-linecap="round"></path>
				<path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"
							stroke-linejoin="round"></path>
			</g>
		</svg>
	</button>

{:else}
	{#await import("./Components/UserLayout.svelte") then UserLayout}
		<UserLayout.default>
			{#snippet content()}
				{#if view === "login"}
					{#await import("./Components/Login.svelte") then Login}
						<Login.default switchToRegister={handleSwitchToRegister} onsubmit={handleSubmit} />
					{/await}
				{:else if view === "register"}
					{#await import("./Components/Register.svelte") then Register}
						<Register.default switchToLogin={handleSwitchToLogin} onsubmit={handleSubmit} />
					{/await}
				{:else if view === "otp"}
					{#await import("./Components/OTP.svelte") then OTP}
						<OTP.default phrase={newSession.phrase} onsubmit={handleOTP} {otp} />
					{/await}
				{/if}
			{/snippet}
		</UserLayout.default>
	{/await}
{/if}

{#if errors.length > 0}
	{#await import("$lib/UI/Error.svelte") then Error}
		{#each errors as error}
			<Error.default {error} />
		{/each}
	{/await}
{/if}