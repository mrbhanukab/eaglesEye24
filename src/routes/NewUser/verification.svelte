<script>
import ButterflyInput from '$lib/UI/butterflyInput.svelte';
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
	<ButterflyInput label="Username" placeholder="Captain Jack Sparrow" type="text" required={true} disabled />

</form>