<script>
	import { onMount } from 'svelte';
	import MainLayout from '$lib/UI/mainLayout.svelte';
	import TheBigButton from '$lib/UI/theBigButton.svelte';
	import ButterflyInput from '$lib/UI/butterflyInput.svelte';
	import Error from '$lib/UI/error.svelte';
	import { goto } from '$app/navigation';

	const { data } = $props(); // Import props from parent component

	let numberOfMembersAllowed = data.event === 'Xploratus' ? 10 : 2;
	let errs = $state([]);
	let numberOfMembers = $state(1);
	let dataSubmited = $state(false);

	onMount(() => {
		if (data.event === 'Aetos Mind') numberOfMembers = 2;
	});

	// Increment members but ensure it does not exceed the allowed limit
	function incrementMembers() {
		if (numberOfMembers < numberOfMembersAllowed && data.event !== 'Aetos Mind') {
			numberOfMembers++;
		}
	}

	// Decrement members but ensure it does not go below 1
	function decrementMembers() {
		if (numberOfMembers > 1 && data.event !== 'Aetos Mind') {
			numberOfMembers--;
		}
	}

	async function handleSubmit(e) {
		errs = [];
		dataSubmited = true;
		e.preventDefault();
		const form = e.target;
		const formData = new FormData(form);

		// Append additional data to formData
		formData.append('event', data.event);
		formData.append('userId', data.userId);

		// Collect members' data and append as an array
		const members = [];
		for (let i = 0; i < numberOfMembers; i++) {
			const memberInput = form.querySelector(`input[name="Member ${i + 1}"]`);
			if (memberInput) {
				members.push(memberInput.value);
			}
		}
		formData.append('members', JSON.stringify(members));

		try {
			const response = await fetch(window.location.href, {
				method: 'POST',
				body: formData
			});

			const result = await response.json();
			errs = result.errors || [];
			if (result.success) {
				await goto('/portal');
			}
			dataSubmited = false;
		} catch (error) {
			errs.push(error.message);
			dataSubmited = false;
		}
	}
</script>

<svelte:head>
	<title>EaglesEye24 | {data.event} | Register</title>
</svelte:head>
<Error error={errs} />
<MainLayout
	imgSrc="https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/6748377500382604535e/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85"
>
	{#snippet aboveImage()}
		<div class="newTeamPageAboveImage">
			<h1>Create Your Team</h1>
			<h4>To Participate in {data.event}</h4>
			<p>
				You will be the <b>leader</b> of your team. Once you create a team,
				<b style="font-weight: bolder; color: red"
				>you cannot create or join another team <u>for the event '{data.event}'</u></b
				>. You can add up to {numberOfMembersAllowed} members to this team, including you.
			</p>
		</div>
	{/snippet}

	{#snippet right()}
		<form class="newTeamPageRight" onsubmit={handleSubmit}>
			<div class="leaderControl">
				<ButterflyInput
					name="Team Name"
					value="{data.school}, Team ..."
					placeholder="Your School, Team 01"
					type="text"
					required={true}
					pattern="^\S+\s+\S+.*$"
					disabled={dataSubmited}
				/>
				<div class="memControl">
					<ButterflyInput name="The Leader 👑" value={data.userName} disabled />
					<div class="addMembers">
						<p>Add Members</p>
						<div class="counter-buttons">
							<button
								type="button"
								onclick={decrementMembers}
								disabled={numberOfMembers <= 1 || dataSubmited ||  data.event === "Aetos Mind"}>-
							</button
							>
							<p>{numberOfMembers} / {numberOfMembersAllowed}</p>
							<button
								type="button"
								onclick={incrementMembers}
								disabled={numberOfMembers >= numberOfMembersAllowed || dataSubmited ||  data.event === "Aetos Mind"}>+
							</button
							>
						</div>
					</div>
				</div>
			</div>

			<div class="members">
				{#each Array(numberOfMembers) as _, i}
					<ButterflyInput
						name="Member {i + 1}"
						placeholder="Member {i + 1} Email"
						type="email"
						required={true}
						disabled={dataSubmited}
					/>
					<span />
				{/each}
			</div>
			<TheBigButton
				title={!dataSubmited ? `Create Your ${data.event} Team` : 'Creating Team ...'}
				type="submit"
				disabled={dataSubmited}
			/>
		</form>
	{/snippet}
</MainLayout>

<style>
    .newTeamPageRight {
        display: flex;
        width: 90%;
        height: 80%;
        flex-direction: column;
        justify-content: space-around;
    }

    .newTeamPageAboveImage {
        color: white;
        text-shadow: 0 0 1rem black;
        font-family: Comfortaa, sans-serif;
        text-transform: capitalize;
        line-height: 0;
        margin-bottom: 1vh;
    }

    .newTeamPageAboveImage h1 {
        font-size: 2.5vw;
        font-weight: 600;
    }

    .newTeamPageAboveImage h4 {
        font-size: 1.1vw;
        font-weight: 300;
    }

    .newTeamPageAboveImage p {
        width: 70%;
        font-size: 1vw;
        font-weight: 400;
        line-height: 120%;
    }

    .leaderControl {
        display: grid;
        grid-template-rows: 1fr 1fr;
        align-items: center;
    }

    .memControl {
        display: grid;
        grid-template-columns: 2fr 1fr;
        align-items: center;
    }

    .addMembers {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 0;
    }

    .addMembers p {
        line-height: 0;
        font-family: Comfortaa, sans-serif;
    }

    .counter-buttons {
        font-weight: bolder;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .counter-buttons p {
        font-family: Lexend, sans-serif !important;
    }

    button {
        font-family: Lexend, sans-serif !important;
        font-weight: bold;
        cursor: pointer;
    }

    .members {
        height: 80%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        justify-content: start;
        justify-items: center;
    }

    .members span {
        height: 1%;
    }
</style>
