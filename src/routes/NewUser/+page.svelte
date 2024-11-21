<script>
  import MainLayout from '$lib/UI/mainLayout.svelte';
	import Form from './form.svelte';
	import Verification from './verification.svelte';
  import { onMount } from 'svelte';

  let imgSrc = "/left/newUser.jpeg";
  let heading = "Create Your Account";
  let subHeading = "& secure your spot";
  let description = "First, you'll need to enter your personal details to create an account. Once you've done that, a username and password will be automatically generated for you. It's important to download and save these credentials in a secure location. Make sure to keep them safe, as you may need them later for logging in.";

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    sessionStorage.setItem('userData', JSON.stringify(data));
    imgSrc = "/left/verify.jpeg";
    heading = "Verify Your Account";
    subHeading = "Almost there!";
    description = "Please verify your account by following the instructions sent to your email.";
    console.log("done");
  }
</script>

<style>
  .newUserPageAboveImage {
    color: white;
    text-shadow: 0 0 1rem black;
    font-family: Comfortaa, sans-serif;
    text-transform: capitalize;
    line-height: 0;
    margin-bottom: 1vh;
  }

  .newUserPageAboveImage h1 {
    font-size: 2.5vw;
    font-weight: 600;
  }

  .newUserPageAboveImage h4 {
    font-size: 1.1vw;
    font-weight: 300;
  }

  .newUserPageAboveImage p {
    width: 70%;
    font-size: 1vw;
    font-weight: 400;
    line-height: 120%;
  }

</style>

<MainLayout {imgSrc}>
  {#snippet aboveImage()}
    <div class="newUserPageAboveImage">
      <h1>{heading}</h1>
      <h4>{subHeading}</h4>
      <p>{description}</p>
    </div>
  {/snippet}
  {#snippet right()}
		{#if imgSrc === "/left/verify.jpeg"}
			<Verification />
		{:else if imgSrc === "/left/newUser.jpeg"}
			<Form {handleSubmit} />
		{/if}
  {/snippet}
</MainLayout>