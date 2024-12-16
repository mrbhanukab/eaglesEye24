<script>
 import './NewUser.css';
 import Form from './form.svelte';
 import Verification from './verification.svelte';
 import Loading from '$lib/UI/loading.svelte';
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
		setTimeout(() => state = 'form', 1500);
	});
</script>

<svelte:head>
	<title>EaglesEye24 | Register</title>
</svelte:head>

{#if state === "loading"}
	<Loading />
{:else if (state === "form")}
	<Form onFormSubmit={handleFormSubmit} imgSrc={images[0]} />
{:else if (state === "verification")}
	<Verification {data} imgSrc={images[1]} />
{:else}
	<h1>Something Went Wrong!</h1>
{/if}