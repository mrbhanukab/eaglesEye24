<script>
  import { leastUsedColor } from '../../stores/colors.svelte.js';
  import { onDestroy } from 'svelte';
  import { onMount } from 'svelte';

  let backgroundColor = '#ffffff';
  let inputElement = $state(null);

  const props = $props();

  const unsubscribeBackground = leastUsedColor.subscribe(value => {
    if (value) {
      backgroundColor = `rgb(${value[0]}, ${value[1]}, ${value[2]}, 0.7)`;
      document.documentElement.style.setProperty('--input-background-color', backgroundColor);
    }
  });

  onDestroy(() => {
    unsubscribeBackground();
  });

onMount(() => {
  inputElement.id = `input-${Math.random().toString(36).substring(2, 11)}`;
});
</script>

<style>
		.inputItem{
				display: flex;
				flex-direction: column;
		}
  input {
    width: auto;
    font-family: Comfortaa, sans-serif;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    font-size: 1.35vw;
    padding: 0.45vw;
    border: var(--background-color, #ffffff);
    background-color: var(--input-background-color, #ffffff);
    color: #000000;
    border-radius: 0.5rem;
  }
    input:focus {
        outline: none;
    }

    label{
			color: white;
      font-family: Comfortaa, sans-serif;
			font-size: 1vw;
      line-height: 170%;
	}

    @media (max-width: 450px), (max-height: 350px) {
        input {
            font-size: 3vw;
            padding: 1vw;
        }

        label{
            font-size: 2vw;
        }
    }
</style>

<div class="inputItem">
	<label for={inputElement?.id}>{props.name}</label>
	<input bind:this={inputElement} {...props}/>
</div>