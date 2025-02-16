<script>
	import TextScramble from '$lib/UI/TextScramble.svelte';
	import BigButton from '$lib/UI/BigButton.svelte';
	import Lecture from '$lib/UI/Lecture.svelte';
	import Footer from '$lib/UI/Footer.svelte';
	import Seo from '$lib/Seo.svelte';

	const { data } = $props();

	let lectures = data.lectures;

</script>

<svelte:head>
	<Seo
		description="Eagles Eye 24 is a series of aviation-related competitions, including Aetos Path (lecture series), Aetos Mind (quiz competition), and Xploratus (exhibition). Organized by Isipathana College Aeronautical Club & Sri Lanka Air Force."
		title="Home"
		url="/" />
	<style>
      #main {
          opacity: 1;
          background-image: linear-gradient(#161616 1px, transparent 1px), linear-gradient(to right, #161616 1px, #000000 1px);
          background-size: 80px 80px;

          #event-title {
              text-shadow: -2px 2px 0 #de3d3d,
              2px -2px 0 #00b1a0,
              0 0 9px #267368;
          }
      }

      #aetos-path {
          opacity: 1;
          background-image: repeating-radial-gradient(circle at 0 0, transparent 0, #000000 30px), repeating-linear-gradient(#16161655, #161616);
          -webkit-box-shadow: 0 0 116px -10px rgba(255, 255, 255, 0.35);
          -moz-box-shadow: 0 0 116px -10px rgba(255, 255, 255, 0.35);
          box-shadow: 0 0 116px -10px rgba(255, 255, 255, 0.35);
      }
	</style>
</svelte:head>

<main class="w-screen min-h-screen flex flex-col justify-center items-center text-white text-center px-10 py-16"
			id="main">
	<h1 class="font-orbitron font-extrabold text-4xl sm:text-5xl" id="event-title">
		Eagles Eye '24 <br />
	</h1>

	<TextScramble />

	<div class="mt-8 flex flex-wrap justify-center gap-4">
		<BigButton href="/aetos-mind" title="Aetos Mind" />
		<BigButton href="/#aetos-path" title="Aetos Path" />
	</div>
</main>

<section class="w-[95vw] px-4 py-8 my-8 sm:py-12 rounded-3xl" id="aetos-path">
	<header>
		<h2 class="text-2xl font-bold font-orbitron text-white sm:text-3xl underline underline-offset-4">Aetos Path</h2>

		<p class="mt-4 max-w-md text-gray-300">
			Embark on a unique learning journey with the Aetos Path Lecture Series, brought to you in collaboration with the
			Sri Lanka Air Force!
		</p>
	</header>

	<div class="mt-8 flex flex-wrap gap-4 justify-evenly">
		{#each lectures as lecture}
			<Lecture title={lecture.title} by={lecture.by} img={lecture.image} youtube={lecture.youtube}
							 start={lecture.start} />
		{/each}
	</div>
</section>

<Footer />