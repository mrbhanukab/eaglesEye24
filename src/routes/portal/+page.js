import { user } from '$lib/AppWrite/user.js';
import { goto } from '$app/navigation';

export const ssr = false;

export async function load({ fetch }) {
	if ((await user.getCurrentSession()) === null) await goto('/');
	const currentUser = await user.getUser();
	let response = await fetch(`/portal?id=${currentUser['$id']}`);
	response = await response.json();
	if (currentUser == null) await goto('/');
	if (!currentUser.status) await goto('/');
	return { response, currentUser };
}
