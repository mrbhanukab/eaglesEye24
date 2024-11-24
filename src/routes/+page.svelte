<script>
  import './home.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import MainLayout from '$lib/UI/mainLayout.svelte';
  import TheBigButton from '$lib/UI/theBigButton.svelte';
  import Loading from '$lib/UI/loading.svelte';
  import { leastUsedColor } from '../stores/colors.svelte.js';
  import { user } from '$lib/AppWrite/user.js';

  let isCacheComplete = false;
  let cachedUrls = {};

  async function checkSessionAndRedirect() {
    if (await user.getCurrentSession() != null) {
      await goto('/portal');
    }
  }

  checkSessionAndRedirect();

  const events = new Map([
    [
      'event1',
      {
        name: 'Aetos Path',
        subTopic: 'The Lecture Series',
        description: 'Embark on a unique learning journey with the Aetos Path Lecture Series, brought to you in collaboration with the Sri Lanka Air Force!',
        image: 'aetos-path.jpeg',
      },
    ],
    [
      'event2',
      {
        name: 'Aetos Mind',
        subTopic: 'The Quiz Competition',
        description: 'Join the Aetos Mind Quiz Competition and test your knowledge against the best!',
        image: 'aetos-mind.jpeg',
      },
    ],
    [
      'event3',
      {
        name: 'Xploratus',
        subTopic: 'The Exhibition',
        description: 'Explore the wonders of science and technology at the Xploratus Exhibition!',
        image: 'xploratus.jpeg',
      },
    ],
  ]);

  let currentEvent = events.get('event1');
  let eventIndex = 0;
  const eventKeys = Array.from(events.keys());

  function changeEvent() {
    eventIndex = (eventIndex + 1) % eventKeys.length;
    currentEvent = events.get(eventKeys[eventIndex]);
  }

  onMount(() => {
    const interval = setInterval(changeEvent, 3000);
    return () => clearInterval(interval);
  });

  let mainColor = '#ffffff';

  leastUsedColor.subscribe(value => {
    if (value) {
      mainColor = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
    }
  });

  function handleCacheComplete(event) {
    isCacheComplete = true;
    cachedUrls = event.detail.cachedUrls;
    // Update event images to use cached URLs
    events.forEach((event, key) => {
      event.image = cachedUrls[event.image];
    });
    currentEvent = events.get(eventKeys[eventIndex]);
  }
</script>

<svelte:head>
  <title>EaglesEye24 | Home</title>
</svelte:head>

{#if !isCacheComplete}
  <Loading on:cacheComplete={handleCacheComplete} />
{:else}
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
        <div>
          <h2>It is Time to begin!</h2>
          <h1>Create Your Account <br />& secure your spot</h1>
        </div>
        <p>First, create an account on the platform. Then, register for each event you're interested in. For individual
          participation in the lecture series or exhibition, you can register directly from your account. If you're
          joining the exhibition or quiz competition as part of a team, the team captain must create the team in the
          portal. The captain will then add members by entering their usernames and unique private keys, which are
          generated for each user.</p>
        <TheBigButton title="Create Your Account" onclick={() => goto('/NewUser')} />
        <a href="/login" >Login With Your Email</a>
      </div>
    {/snippet}
  </MainLayout>
{/if}