import { participantsDB } from '$lib/server/database.js';
import { error } from '@sveltejs/kit';

/*
*? What Need to check/query?
* 1. Check If Email belongs to any documents
* */

export async function POST({ request }) {
	let errors = [];
	try {
		const formData = await request.formData();
		const data = {};
		formData.forEach((value, key) => {
			data[key] = value;
		});

		const emailExists = await participantsDB.searchUsers([['Email', data.Email]]);
		if (emailExists.total === 0) {
			errors.push('An account for the email you entered does not exist!');
		}

		return new Response(JSON.stringify({ errors }), {
			headers: { 'Content-Type': 'application/json' }
		});

	} catch (err) {
		console.error('Error processing form data:', err);
		throw error(500, 'Internal Server Error');
	}
}