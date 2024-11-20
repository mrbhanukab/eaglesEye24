<script>
	 import MainLayout from '$lib/UI/mainLayout.svelte';
	 import TheBigButton from '$lib/UI/theBigButton.svelte';
</script>

<style>
	.indexPageRight{
			width: 70%;
			color: white;
      font-family: Comfortaa,sans-serif;
  }

	.indexPageRight h2{
      font-size: 1.6vw;
      font-style: normal;
      font-weight: 300;
      line-height: 0;
	}

	.indexPageRight h1{
      /*font-size: 2.8rem;*/
			font-size: 3vw;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      text-transform: capitalize;
	}

	.indexPageRight p{
			text-align: justify;
      font-size: 1vw;
      font-style: normal;
      font-weight: 400;
      line-height: 137.5%;
			margin-bottom: 4rem;
	}
</style>

<MainLayout
	imgSrc = '/left/exhibition.jpeg'
	alt = 'Citrus'
>
	{#snippet right()}
		<div class="indexPageRight">
		<h2>It is Time to begin!</h2>
		<h1>Create Your Account <br />& secure your spot</h1>
		<p>First, create an account on the platform. Then, register for each event you're interested in. For individual participation in the lecture series or exhibition, you can register directly from your account. If you're joining the exhibition or quiz competition as part of a team, the team captain must create the team in the portal. The captain will then add members by entering their usernames and unique private keys, which are generated for each user.</p>
		<TheBigButton title="Create Your Account"/>
		</div>
	{/snippet}
	{#snippet aboveImage()}
		<h1>Aetos Path</h1>
		<h4>The Lecture Series</h4>
		<p>Embark on a  unique learning journey with the Aetos Path Lecture Series, brought to  you in collaboration with the Sri Lanka Air Force!</p>
	{/snippet}
</MainLayout>