import { user } from '$lib/AppWrite/user.js';
import { goto } from '$app/navigation';

export const ssr = false;

export async function load() {
	if (await user.getCurrentSession() != null) await goto('/portal');
}