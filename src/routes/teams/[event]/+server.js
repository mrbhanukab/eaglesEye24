import { participantsDB } from '$lib/server/database.js';
import { error } from '@sveltejs/kit';

export async function GET({ params, url }) {
	const id = url.searchParams.get('id');
	const user = await participantsDB.getAccount(id);
	if (!user) error('406', 'User not found');
	if (user[params.event] !== null) {
		return new Response(JSON.stringify({ allowed: false }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
	return new Response(
		JSON.stringify({ allowed: true, name: user.Name, school: user['School-University'] }),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
}

export async function POST({ request }) {
	let errors = [];
	try {
		let formData = await request.formData();
		let members = [];
		const membersToCheck = JSON.parse(formData.get('members'));

		let event = formData.get('event');
		if (event === 'Aetos Mind') event = 'aetosMind';
		else if (event === 'Xploratus') event = 'xploratus';

		for (const memberEmail of membersToCheck) {
			const currentUser = await participantsDB.searchUserWithExactly([['Email', memberEmail]]);
			if (currentUser.total === 0)
				errors.push(`An account for the email '${memberEmail}' does not exist!`);
			else if (currentUser.documents[0][event] !== null)
				errors.push(`The account with the email '${memberEmail}' already belongs to a team!`);
			else members.push(currentUser.documents[0]['$id']);
		}

		if (errors.length === 0) {
			const data = {
				team: formData.get('Team Name'),
				leader: formData.get('userId'),
				members: [formData.get('userId'), ...members]
			};
			const databaseResponse = await participantsDB.createTeam(data, event);
			console.log('Database Response:', databaseResponse);
			return new Response(JSON.stringify({ success: true }), {
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(JSON.stringify({ success: false, errors }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('Error processing form data:', err);
		throw error(500, 'Internal Server Error');
	}
}
