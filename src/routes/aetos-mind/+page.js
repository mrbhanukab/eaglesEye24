import { user } from '$lib/AppWrite/user.js';

export const ssr = false;

export async function load() {
	const session = await user.getCurrentSession();
	let otherData = null;
	if (session) {
		const queryParams = new URLSearchParams({
			event: 'user',
			id: session['$id']
		}).toString();
		const response = await fetch(`/aetos-mind?${queryParams}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		otherData = await response.json();
	}
	return { session: session, otherData: otherData };
}
