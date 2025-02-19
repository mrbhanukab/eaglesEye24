<script>
	import Input from '$lib/UI/Input.svelte';
	import Error from '$lib/UI/Error.svelte';

	let { userData } = $props();
	let errors = $state([]);

	console.info(userData);

	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());
		data.event = 'team';
		data.userId = userData['$id'];
		data.school = userData['School-University'];

		try {
			const response = await fetch('/aetos-mind', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const result = await response.json();
			if (result.success) location.reload();
			errors = result.errors;
		} catch (error) {
			errors = [error.message];
		}
	}
</script>

<svelte:head>
	<style>
      #image {
          --s: 120px; /* control the size */
          --c1: #727171;
          --c2: #3d3d3d;
          --c3: #212121;

          --_l: #0000 calc(25% / 3), var(--c1) 0 25%, #0000 0;
          --_g: conic-gradient(from 120deg at 50% 87.5%, var(--c1) 120deg, #0000 0);

          background: var(--_g), var(--_g) 0 calc(var(--s) / 2),
          conic-gradient(from 180deg at 75%, var(--c2) 60deg, #0000 0),
          conic-gradient(from 60deg at 75% 75%, var(--c1) 0 60deg, #0000 0),
          linear-gradient(150deg, var(--_l)) 0 calc(var(--s) / 2),
          conic-gradient(
                  at 25% 25%,
                  #0000 50%,
                  var(--c2) 0 240deg,
                  var(--c1) 0 300deg,
                  var(--c2) 0
          ),
          linear-gradient(-150deg, var(--_l)) var(--c3);
          background-size: calc(0.866 * var(--s)) var(--s);
      }

	</style>
</svelte:head>

<section class="min-h-screen w-screen flex flex-col justify-center" id="image">
	<div class="px-8 py-6 bg-black/60 rounded-lg shadow-lg mx-[5vw] my-[5vh] sm:mx-[15vw]">
		<h2 class="text-2xl font-semibold text-white mb-4">Create Your Aetos Mind Team</h2>
		<form class="flex flex-col justify-evenly gap-2" onsubmit={handleSubmit}>
			<div class="flex sm:flex-row flex-col gap-2 justify-between items-center">
				<Input disabled lable="School" name="school" value={userData["School-University"]} />
				<Input lable="Team Name" name="team" pattern="[A-Ca-c]" placeholder="A or B or C" required={true} />
			</div>
			<Input disabled lable="Leader (Member 1)" name="school" value={userData.Name} />
			{#each Array(4) as _, i}
				<Input lable="Member {i + 2}" name="member{i + 2}" placeholder="Member {i + 2}'s Name" type="text"
							 required={true} />
			{/each}
			<button
				class="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300 mt-5"
				type="submit">
				Create Your Team
			</button>
		</form>
	</div>
</section>

{#if errors.length > 0}
	{#each errors as error}
		<Error {error} />
	{/each}
{/if}