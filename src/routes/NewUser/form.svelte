<script>
  import ButterflyInput from '$lib/UI/butterflyInput.svelte';
  import TheBigButton from '$lib/UI/theBigButton.svelte';

	const props = $props();
</script>

<style>
  .newUserPageRight {
    display: flex;
    width: 90%;
    height: 80%;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .newUserPageRight span {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1vw;
  }
</style>

<form class="newUserPageRight" on:submit|preventDefault={props.handleSubmit}>
  <ButterflyInput label="Name" placeholder="Captain Jack Sparrow" type="text" required={true} />
  <ButterflyInput label="Email" placeholder="Captain@JackSparrow.lk" type="email" required={true} />
  <span>
    <ButterflyInput label="Birthday" placeholder="31/02/2000" type="date" required={true} />
    <ButterflyInput label="Gender" placeholder="M/F" type="text" required={true} />
  </span>
  <ButterflyInput label="Whatsapp Number" placeholder="+94123456789" type="tel" required={true} />
  <ButterflyInput label="School" placeholder="School Name, Location" type="text" required={true} />
  <TheBigButton title="Create Your Account" type="submit" />
</form>