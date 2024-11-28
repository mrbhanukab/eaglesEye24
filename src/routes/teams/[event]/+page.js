import { user } from '$lib/AppWrite/user.js';
import { error } from '@sveltejs/kit';

export const ssr = false;
let session;

export async function load({ params, fetch }) {
	if (!(params.event == 'aetosMind' || params.event == 'xploratus')) error('400', 'Invalid Event');
	session = await user.getCurrentSession();
	console.log('Session ID:', session.$id);
	const response = await fetch(`/teams/${params.event}?id=${session.$id}`);
	const data = await response.json();
	if (!data.allowed) error('403', `User Already Registered for Team '${user[params.event]}'`);
	return {
		userName: data.name,
		userId: session.$id,
		event: params.event === 'aetosMind' ? 'Aetos Mind' : 'Xploratus',
		allowed: data.allowed
	};
}
