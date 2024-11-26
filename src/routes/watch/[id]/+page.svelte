<script>
  import './watch.css';
  import Loading from '$lib/UI/loading.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/AppWrite/user.js';

  export let data;
  let logos = null;
  let currentUser = null;
  let isCacheComplete = false;
  let cachedUrls = {};

  async function fetchData() {
    currentUser = await user.getUser();
    if (currentUser == null) await goto('/');
    if (!currentUser.status) await goto('/');
  }

  function handleCacheComplete(event) {
    isCacheComplete = true;
    cachedUrls = event.detail.cachedUrls;
    fetch(cachedUrls['logos.json'])
      .then(response => response.json())
      .then(data => {
        logos = data;
      });
  }

  onMount(() => {
    fetchData();
  });
</script>

<svelte:head>
  <title>EaglesEye24 | Watch</title>
</svelte:head>

{#if !isCacheComplete}
  <Loading on:cacheComplete={handleCacheComplete} />
{:else}
  <section class="youtube">
    <header class="header">
			<div class="eventLogo">
				<h1>Eagles Eye '24 |</h1>
				<span class="collaboration">
            <h2>collaboration with<br /> <span>Sri Lanka Air Force</span></h2>
            <img src={`data:image/png;base64, ${logos?.airForce}`} alt="air force logo" draggable="false" />
            <img class="icacLogo" src={`data:image/png;base64, ${logos?.icac}`} alt="ICAC logo" draggable="false" />
          </span>
			</div>
    </header>
    <div class="youtuubeContainer">
      <div class="youtube-video-container">
        <iframe
          src="https://www.youtube.com/embed/{data.id}"
          frameborder="0"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        			<div class="eventDetails">
        				<h2>{data.title}</h2>
                <p>by <span>{data.lecture}</span></p>
        			</div>
      </div>
      <div class="youtube-liveChat-container">
        <iframe
          src="https://www.youtube.com/live_chat?v={data.id}&amp;embed_domain=eagles-eye24.vercel.app"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  </section>
{/if}