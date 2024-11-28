<script>
  import './page.css';
  import { onMount, onDestroy } from 'svelte';
  import { goto } from '$app/navigation';
  import MainLayout from '$lib/UI/mainLayout.svelte';
  import TheBigButton from '$lib/UI/theBigButton.svelte';
  import Loading from '$lib/UI/loading.svelte';
  import { leastUsedColor } from '../stores/colors.svelte.js';

  let loading = $state(true);
  let events = $state(new Map([
    ['event1', {
      name: 'Aetos Path',
      subTopic: 'The Lecture Series',
      description: 'Embark on a unique learning journey with the Aetos Path Lecture Series, brought to you in collaboration with the Sri Lanka Air Force!',
      image: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e26002163de97f3/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85',
    }],
    ['event2', {
      name: 'Aetos Mind',
      subTopic: 'The Quiz Competition',
      description: 'Join the Aetos Mind Quiz Competition and test your knowledge against the best!',
      image: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e1400024238213f/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85',
    }],
    ['event3', {
      name: 'Xploratus',
      subTopic: 'The Exhibition',
      description: 'Explore the wonders of science and technology at the Xploratus Exhibition!',
      image: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e58000c5d70ccc5/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85',
    }]
  ]));

  let eventIndex = $state(0);
  const eventKeys = Array.from(events.keys());
  let currentEvent = $state(events.get(eventKeys[eventIndex]));

  // Update currentEvent whenever eventIndex changes
  $effect(() => {
    currentEvent = events.get(eventKeys[eventIndex]);
  });

  // Cycle through events every 5 seconds
  let interval;
  onMount(() => {
    downloadImage();

    interval = setInterval(() => {
      eventIndex = (eventIndex + 1) % eventKeys.length; // Cycle to the next event
    }, 5000); // Change every 5 seconds

    setTimeout(() => loading = false, 1500);
  });

  onDestroy(() => {
    clearInterval(interval); // Clean up the interval
  });

  async function downloadImage() {
    for (const [key, event] of events.entries()) {
      try {
        const response = await fetch(event.image);
        if (!response.ok) {
          throw new Error(`Image Not Found! [${event.image}]`);
        }
        const blob = await response.blob();
        event.image = URL.createObjectURL(blob);
      } catch (error) {
        console.error('Error downloading image:', error);
      }
    }
  }

  let mainColor = '#ffffff';
  leastUsedColor.subscribe(value => {
    if (value) {
      mainColor = `rgb(${value[0]}, ${value[1]}, ${value[2]})`;
    }
  });
</script>

<svelte:head>
  <title>EaglesEye24 | Home</title>
</svelte:head>

{#if loading}
  <Loading />
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
        <p>First, create an account on the platform to gain access to the entire lecture series, including both live sessions and recorded content. After registering, you will need to create a team within the portal in order to participate in events like Aetos Mind or Xploratus. Only one member of the team can create the group, and that person will be the team leader. It’s important to enter accurate details, especially your phone number and email address, as these will be used for authentication. Also, ensure that both the email and phone number you provide are unique to your account, as duplicate information may cause issues during registration.</p>
        <TheBigButton title="Create Your Account" onclick={() => goto('/user/NewUser')} />
        <a href="/user/login">Login With Your Email</a>
      </div>
    {/snippet}
  </MainLayout>
{/if}
