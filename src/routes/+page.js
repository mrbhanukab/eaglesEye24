import { user } from '$lib/AppWrite/user.js';
import { goto } from '$app/navigation';

export const ssr = false;

export async function load({ params, fetch }) {
	const currentUser = await user.getUser();
	if (await user.getCurrentSession() != null) await goto('/portal');
	if (currentUser == null) await goto('/');
	if (!currentUser.status) await goto('/');
}