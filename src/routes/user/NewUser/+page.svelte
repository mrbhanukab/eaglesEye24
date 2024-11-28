<script>
 import './NewUser.css';
 import Form from './form.svelte';
 import Verification from './verification.svelte';
 import Loading from '$lib/UI/loading.svelte';
 import { onMount } from 'svelte';

 let state = $state("loading");
 let images = $state(["https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e33003dbffe0e4c/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85", "https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e4100376276f370/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85"]);
 let data = $state(null);

 function handleFormSubmit(formData) {
  data = formData;
  state = "verification";
 }

 async function downloadImage() {
  for (let i = 0; i<images.length; i++) {
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
  setTimeout(() => state = "form", 1500);
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