<script>
  import './watch.css';
  import Loading from '$lib/UI/loading.svelte';
  import { onMount } from 'svelte';

	const { data } = $props();
	let logos = $state(null);
	let loading = $state(true);

	async function fetchLogos() {
		try {
			const logosResponse = await fetch('/logos.json');
			logos = await logosResponse.json();
		} catch (error) {
			console.error('Error downloading logos.json:', error);
		}
	}

  onMount(() => {
		fetchLogos();
		setTimeout(() => (loading = false), 1500);
  });
</script>

<svelte:head>
  <title>EaglesEye24 | 📺 {data.title}</title>
</svelte:head>

{#if loading}
  <Loading />
{:else}
  <section class="youtube">
    <header class="header">
			<div class="eventLogo">
				<h1>Eagles Eye '24 |</h1>
				<span class="collaboration">
            <h2>collaboration with<br /> <span>Sri Lanka Air Force</span></h2>
            <img src={`data:image/png;base64, ${logos?.airForce}`} alt="air force logo" draggable="false" />
            <img class="icacLogoInWatch" src={`data:image/png;base64, ${logos?.icac}`} alt="ICAC logo" draggable="false" />
          </span>
			</div>
    </header>
    <div class="youtubeContainer">
      <div class="youtube-video-container">
        <iframe
					title="Video Feed"
          src="https://www.youtube.com/embed/{data.id}"
          style="border: none"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>
        			<div class="eventDetails">
        				<h2>{data.title}</h2>
                <p>by <span>{data.lecture}</span></p>
        			</div>
      </div>
      <div class="youtube-liveChat-container">
        <iframe
					title="Live Chat"
          src="https://www.youtube.com/live_chat?v={data.id}&amp;embed_domain=eagles-eye24.vercel.app"
					style="border: none"
        ></iframe>
      </div>
    </div>
  </section>
{/if}