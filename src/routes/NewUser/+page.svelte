<script>
 import './NewUser.css';
 import Form from './form.svelte';
 import Verification from './verification.svelte';

 let state = $state("form");
 let data;

 function handleFormSubmit(formData) {
  data = formData ;
  state = "verification";
 }

</script>

<svelte:head>
 <title>EaglesEye24 | Register</title>
</svelte:head>

{#if state === "form"}
 <Form onFormSubmit={handleFormSubmit} />
{:else if (state === "verification")}
 <Verification {data} />
{:else}
 <h1>Something Went Wrong!</h1>
{/if}