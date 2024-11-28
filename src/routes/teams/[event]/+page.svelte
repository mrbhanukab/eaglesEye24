<script>
	import { Input } from 'flowbite-svelte';

	const { data } = $props(); // Import props from parent component

	import MainLayout from '$lib/UI/mainLayout.svelte';
	import TheBigButton from '$lib/UI/theBigButton.svelte';
	import ButterflyInput from '$lib/UI/butterflyInput.svelte';
	import { goto } from '$app/navigation';

	let numberOfMembersAllowed = (data.event === "Xploratus" ? 10 : 3);

	let numberOfMembers = $state(1);
	let dataSubmited = $state(false);

	// Increment members but ensure it does not exceed the allowed limit
	function incrementMembers() {
		if (numberOfMembers < numberOfMembersAllowed) {
			numberOfMembers++;
		}
	}

	// Decrement members but ensure it does not go below 1
	function decrementMembers() {
		if (numberOfMembers > 1) {
			numberOfMembers--;
		}
	}

async function handleSubmit(e) {
	dataSubmited = true;
	e.preventDefault();
	const form = e.target;
	const formData = new FormData(form);

	// Append additional data to formData
	formData.append('event', data.event);
	formData.append('userId', data.userId);

	console.log('Form Data:', formData);

	try {
		const response = await fetch(window.location.href, {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const result = await response.json();
		console.log('Success:', result);
		if(result.success){
			goto('/portal');
		}
	} catch (error) {
		console.error('Error:', error);
	}
}
</script>

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

		.leaderControl{
        display: grid;
        grid-template-rows: 1fr 1fr;
				align-items: center;
		}

    .memControl{
        display: grid;
        grid-template-columns: 2fr 1fr;
        align-items: center;
    }
		.addMembers{
				color: white;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				gap: 0;
		}

		.addMembers p{
				line-height: 0;
        font-family: Comfortaa, sans-serif;
		}
    .counter-buttons {
				font-weight: bolder;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

		.counter-buttons p{
        font-family: Lexend, sans-serif !important;
    }

    button {
        font-family: Lexend, sans-serif !important;
        font-weight: bold;
        cursor: pointer;
    }

		.members{
				height: 80%;
        overflow-y: auto;
				display: flex;
				flex-direction: column;
				justify-content: start;
				justify-items: center;
    }

		.members span{
				height: 1%;
		}
</style>

<MainLayout imgSrc="https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/6748377500382604535e/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85">
	{#snippet aboveImage()}
		<div class="newTeamPageAboveImage">
			<h1>Create Your Team</h1>
			<h4>To Participate in {data.event}</h4>
			<p>
				You will be the <b>leader</b> of your team. Once you create a team,
				<b style="font-weight: bolder; color: red">you cannot create or join another team <u>for the event '{data.event}'</u></b>.
				You can add up to {numberOfMembersAllowed} members to this team.
				Although the system allows you to add team members with only the restriction of a maximum number of members,
				<b style="font-weight: bolder; color: red">if you add fewer members than required by the rules and regulations of '{data.event}',
					your <u>team will be disqualified.</u></b>
			</p>
		</div>
	{/snippet}

	{#snippet right()}
		<form class="newTeamPageRight" onsubmit={handleSubmit}>
			<div class="leaderControl">
				<ButterflyInput name="Team Name" placeholder="Your School, Team 01" type="text" required={true} pattern="^\S+\s+\S+.*$" disabled={dataSubmited}/>
				<div class="memControl">
					<ButterflyInput name="The Leader 👑" value={data.userName} disabled />
					<div class="addMembers">
						<p>Add Members</p>
						<div class="counter-buttons">
							<button type="button" onclick={decrementMembers} disabled={numberOfMembers <= 1 || dataSubmited}>-</button>
							<p>{numberOfMembers} / {numberOfMembersAllowed}</p>
							<button type="button" onclick={incrementMembers} disabled={numberOfMembers >= numberOfMembersAllowed || dataSubmited}>+</button>
						</div>
					</div>
				</div>
			</div>

			<div class="members">
				{#each Array(numberOfMembers) as _, i}
					<ButterflyInput name="Member {i + 1}" placeholder="Member {i+1} ID" type="text" required={true} disabled={dataSubmited} />
					<span/>
				{/each}
			</div>
<TheBigButton title={!dataSubmited ? `Create Your ${data.event} Team` : "Creating Team ..."} type="submit" disabled={dataSubmited}/>
		</form>
	{/snippet}
</MainLayout>
