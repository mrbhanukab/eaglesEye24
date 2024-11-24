<script>
 import './NewUser.css';
 import Form from './form.svelte';
 import Verification from './verification.svelte';
 import Loading from '$lib/UI/loading.svelte';

 let state = $state("loading");
 let data;
 let cachedUrls = {};

 function handleFormSubmit(formData) {
  data = formData;
  state = "verification";
 }

 function handleCacheComplete(event) {
  cachedUrls = event.detail.cachedUrls;
  state = "form";
 }
</script>

<svelte:head>
 <title>EaglesEye24 | Register</title>
</svelte:head>

{#if state === "loading"}
 <Loading on:cacheComplete={handleCacheComplete} />
{:else if (state === "form")}
 <Form onFormSubmit={handleFormSubmit} imgSrc={cachedUrls['newUser.jpeg']} logosUrl={cachedUrls['logos.json']} />
{:else if (state === "verification")}
 <Verification {data} imgSrc={cachedUrls['verify.jpeg']} logosUrl={cachedUrls['logos.json']} />
{:else}
 <h1>Something Went Wrong!</h1>
{/if}