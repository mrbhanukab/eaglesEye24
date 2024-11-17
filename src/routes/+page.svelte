<script>
	 import MainLayout from '$lib/UI/mainLayout.svelte';
</script>

<MainLayout
	imgSrc = 'https://cdn.pixabay.com/photo/2024/06/20/17/21/citrus-8842629_960_720.png'
	alt = 'Citrus'
>
	{#snippet right()}
		<h1>Right</h1>
	{/snippet}
	{#snippet aboveImage()}
		<h1>Image</h1>
		<h2>Image</h2>
		<h3>Image</h3>
		<h4>Image</h4>
	{/snippet}
</MainLayout>