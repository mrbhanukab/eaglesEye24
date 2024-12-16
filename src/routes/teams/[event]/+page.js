import { user } from '$lib/AppWrite/user.js';
import { error } from '@sveltejs/kit';

export const ssr = false;
let session;

export async function load({ params, fetch }) {
	if (!(params.event == 'aetosMind' || params.event == 'Xploratus')) error('400', 'Invalid Event');
	session = await user.getCurrentSession();
	console.log('Session ID:', session.$id);
	let event = params.event;
	if (event === 'Xploratus') event = 'xploratus';
	const response = await fetch(`/teams/${event}?id=${session.$id}`);
	const data = await response.json();
	if (!data.allowed) error('403', `User Already Registered for a Team`);
	return {
		userName: data.name,
		userId: session.$id,
		event: params.event === 'aetosMind' ? 'Aetos Mind' : 'Xploratus',
		school: data.school,
		allowed: data.allowed
	};
}
