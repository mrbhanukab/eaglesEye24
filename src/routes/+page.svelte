<script>
 import { onMount } from 'svelte';
 import { goto } from '$app/navigation';
 import MainLayout from '$lib/UI/mainLayout.svelte';
 import TheBigButton from '$lib/UI/theBigButton.svelte';
 import { leastUsedColor } from '../stores/colors.svelte.js';

 const events = new Map([
  [
   'event1',
   {
    name: 'Aetos Path',
    subTopic: 'The Lecture Series',
    description: 'Embark on a unique learning journey with the Aetos Path Lecture Series, brought to you in collaboration with the Sri Lanka Air Force!',
    image: '/left/aetos-path.jpeg',
   },
  ],
  [
   'event2',
   {
    name: 'Aetos Mind',
    subTopic: 'The Quiz Competition',
    description: 'Join the Aetos Mind Quiz Competition and test your knowledge against the best!',
    image: '/left/aetos-mind.jpeg',
   },
  ],
  [
   'event3',
   {
    name: 'Xploratus',
    subTopic: 'The Exhibition',
    description: 'Explore the wonders of science and technology at the Xploratus Exhibition!',
    image: '/left/xploratus.jpeg',
   },
  ],
 ]);

 let currentEvent = $state(events.get('event1'));
 let eventIndex = $state(0);
 const eventKeys = Array.from(events.keys());

 function changeEvent() {
  eventIndex = (eventIndex + 1) % eventKeys.length;
  currentEvent = events.get(eventKeys[eventIndex]);
 }

 onMount(() => {
  const interval = setInterval(changeEvent, 3000);
  return () => clearInterval(interval);
 });

 let mainColor = $state('#ffffff');

 leastUsedColor.subscribe(value => {
  if (value) {
   mainColor = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
  }
 });
</script>

<svelte:head>
  <title>EaglesEye24 | Home</title>
</svelte:head>
<style>
    .indexPageRight {
        width: 70%;
        color: white;
        font-family: Comfortaa, sans-serif;
    }

    .indexPageRight h2 {
        font-size: 1.6vw;
        font-style: normal;
        font-weight: 300;
        line-height: 0;
    }

    .indexPageRight h1 {
        font-size: 3vw;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        text-transform: capitalize;
    }

    .indexPageRight p {
        text-align: justify;
        font-size: 1vw;
        font-style: normal;
        font-weight: 400;
        line-height: 137.5%;
        margin-bottom: 4rem;
    }

    .indexPageAboveImage {
        color: white;
        text-shadow: 0 0 1rem black;
        font-family: Comfortaa, sans-serif;
        text-transform: capitalize;
        line-height: 0%;
    margin-bottom: 1vh;
    }

    .indexPageAboveImage h1 {
        font-size: 2.5vw;
        font-weight: 600;
    }

    .indexPageAboveImage h4 {
        font-size: 1.1vw;
        font-weight: 300;
    }

    .indexPageAboveImage p {
        width: 70%;
        font-size: 1.2vw;
        font-weight: 400;
        line-height: 120%;
    }

    .eventIndicator {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        gap: 1vw;
        width: 100%;
    }

    .eventIndicator span {
        width: 3vw;
        height: 1vw;
        display: inline-block;
        border: 2px solid var(--main-color);
        border-radius: 2rem;
        background-color: var(--main-color);
    }

    @media (max-width: 450px), (max-height: 350px) {
      .indexPageRight {
        width: 80%;
        padding: 3vh;
      }

      .indexPageRight h2 {
        font-size: 3vw;
      }

      .indexPageRight h1 {
        font-size: 5vw;
      }

      .indexPageRight p {
        font-size: 2vw;
      }

      .indexPageAboveImage {
        margin-bottom: 0vh;
      }

      .indexPageAboveImage h1 {
        font-size: 5vw;
      }

      .indexPageAboveImage h4 {
        font-size: 2.5vw;
      }

      .indexPageAboveImage p {
        font-size: 3vw;
      }
    }

</style>

<MainLayout imgSrc={currentEvent.image} alt={currentEvent.name}>
 {#snippet aboveImage()}
	 <div class="indexPageAboveImage">
   <h1>{currentEvent.name}</h1>
   <h4>{currentEvent.subTopic}</h4>
   <p>{currentEvent.description}</p>
   <div class="eventIndicator">
    {#each eventKeys as key, index}
     <span style="--main-color: {index === eventIndex ? mainColor : ''}"></span>
    {/each}
   </div>
  </div>
 {/snippet}
 {#snippet right()}
  <div class="indexPageRight">
   <h2>It is Time to begin!</h2>
   <h1>Create Your Account <br />& secure your spot</h1>
   <p>First, create an account on the platform. Then, register for each event you're interested in. For individual
    participation in the lecture series or exhibition, you can register directly from your account. If you're
    joining the exhibition or quiz competition as part of a team, the team captain must create the team in the
    portal. The captain will then add members by entering their usernames and unique private keys, which are
    generated for each user.</p>
  <TheBigButton title="Create Your Account" onclick={() => goto('/NewUser')}/>  </div>
 {/snippet}
</MainLayout>