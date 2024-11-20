<script>
  import { mostUsedColor, leastUsedColor } from '../../stores/colors.svelte.js';
  import { onDestroy } from 'svelte';

  let backgroundColor = $state('#ffffff'); // Default color
  let textColor = $state('#000000'); // Default color

  const props = $props();

  const unsubscribeBackground = leastUsedColor.subscribe(value => {
    if (value) {
      backgroundColor = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
    }
  });

  const unsubscribeText = mostUsedColor.subscribe(value => {
    if (value) {
      textColor = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
    }
  });

  onDestroy(() => {
    unsubscribeBackground();
    unsubscribeText();
  });
</script>

<button class="bigButton" style="background-color: {backgroundColor}; color: {textColor};" onclick={props.onclick}>
  {props.title}
</button>

<style>
  .bigButton {
      font-family: Comfortaa, sans-serif;
      font-size: 2.2vw;
      font-style: normal;
      font-weight: 700;
      text-transform: capitalize;
      padding: 0.7rem;
      min-width: 100%;
      border: none;
      border-radius: 50rem;
  }
</style>