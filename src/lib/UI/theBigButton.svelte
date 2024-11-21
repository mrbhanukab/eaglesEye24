<script>
  import { mostUsedColor, leastUsedColor } from '../../stores/colors.svelte.js';
  import { onDestroy } from 'svelte';

  let backgroundColor = '#ffffff'; // Default color
  let textColor = '#000000'; // Default color

  const props = $props();

  const unsubscribeBackground = leastUsedColor.subscribe(value => {
    if (value) {
      backgroundColor = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
      document.documentElement.style.setProperty('--background-color', backgroundColor);
    }
  });

  const unsubscribeText = mostUsedColor.subscribe(value => {
    if (value) {
      textColor = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
      document.documentElement.style.setProperty('--text-color', textColor);
    }
  });

  onDestroy(() => {
    unsubscribeBackground();
    unsubscribeText();
  });
</script>

<button class="bigButton" onclick={props.onclick} type={props.type}>
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
    background-color: var(--background-color, #ffffff);
    color: var(--text-color, #000000);
    transition: background-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease-out;
  }

  .bigButton:hover {
    -webkit-box-shadow: 0 0 95px -12px var(--background-color, #ffffff);
    -moz-box-shadow: 0 0 95px -12px var(--background-color, #ffffff);
    box-shadow: 0 0 95px -12px var(--background-color, #ffffff);
    transition: box-shadow 0.5s ease-in;
  }

  @media (max-width: 450px), (max-height: 350px) {
    .bigButton {
      font-size: 4vw;
    }
  }
</style>