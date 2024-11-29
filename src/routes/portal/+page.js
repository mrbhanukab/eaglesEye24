import { user } from '$lib/AppWrite/user.js';
import { goto } from '$app/navigation';

export const ssr = false;

export async function load({ fetch }) {
	if ((await user.getCurrentSession()) === null) await goto('/');
	const response = await fetch(`/portal`);
	const aetosPath = await response.json();
	const currentUser = await user.getUser();
	if (currentUser == null) await goto('/');
	if (!currentUser.status) await goto('/');
	return { aetosPath, currentUser };
}
