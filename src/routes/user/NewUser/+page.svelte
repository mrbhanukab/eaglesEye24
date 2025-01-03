<script>
	import './NewUser.css';
	import Form from './form.svelte';
	import Verification from './verification.svelte';
	import { onMount } from 'svelte';

	let state = $state('loading');
	let images = $state(['/newUser.webp', '/verify.webp']);
	let data = $state(null);

	function handleFormSubmit(formData) {
		data = formData;
		state = 'verification';
	}

	async function downloadImage() {
		for (let i = 0; i < images.length; i++) {
			try {
				const response = await fetch(images[i]);
				if (!response.ok) console.error('404', `Image Not Found! [${images[i]}]`);
				const blob = await response.blob();
				images[i] = URL.createObjectURL(blob);
			} catch (error) {
				console.error('Error downloading image:', error);
			}
		}
	}

	onMount(async () => {
		await downloadImage();
		state = 'form';
	});
</script>

<svelte:head>
	<title>EaglesEye24 | Register</title>
</svelte:head>

{#if (state === "form")}
	<Form onFormSubmit={handleFormSubmit} imgSrc={images[0]} />
{:else if (state === "verification")}
	<Verification {data} imgSrc={images[1]} />
{/if}