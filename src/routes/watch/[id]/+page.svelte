<script>
	import './watch.css';

	const { data } = $props();


</script>

<svelte:head>
	<title>EaglesEye24 | 📺 {data.title}</title>
</svelte:head>

<section class="youtube">
	<header class="header">
		<div class="eventLogo">
			<h1>Eagles Eye '24 |</h1>
			<span class="collaboration">
            <h2>collaboration with<br /> <span>Sri Lanka Air Force</span></h2>
            <img alt="air force logo" draggable="false" src="/logos/aireforce.webp" />
            <img alt="ICAC logo" class="icacLogoInWatch" draggable="false" src="/logos/icac.webp" />
          </span>
		</div>
	</header>
	<div class="youtubeContainer">
		<div class="youtube-video-container">
			<iframe
				allow="autoplay; encrypted-media; picture-in-picture"
				allowfullscreen
				src="https://www.youtube.com/embed/{data.id}"
				style="border: none"
				title="Video Feed"
			></iframe>
			<div class="eventDetails">
				<h2>{data.title}</h2>
				<p>by <span>{data.lecture}</span></p>
			</div>
		</div>
		<div class="youtube-liveChat-container">
			<iframe
				src="https://www.youtube.com/live_chat?v={data.id}&amp;embed_domain=eagles-eye24.vercel.app"
				style="border: none"
				title="Live Chat"
			></iframe>
		</div>
	</div>
</section>