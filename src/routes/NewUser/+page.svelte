<script>
 import Form from './form.svelte';
 import Verification from './verification.svelte';

 let state = "form";
 let email;

 function handleFormSubmit({ email: formEmail }) {
  email = formEmail;
  state = "verification";
 }
</script>

<svelte:head>
 <title>EaglesEye24 | Register</title>
</svelte:head>

<style>
 @import './NewUser.css';
</style>

{#if state === "form"}
 <Form onFormSubmit={handleFormSubmit} />
{:else if (state === "verification")}
 <Verification {email} />
{:else}
 <h1>Something Went Wrong!</h1>
{/if}