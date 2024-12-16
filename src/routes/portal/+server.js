import { participantsDB, webAppDB } from '$lib/server/database.js';

export async function GET({ url }) {
	const id = url.searchParams.get('id');
	const user = await participantsDB.getAccount(id);
	const aetosMind =
		user.aetosMind === null
			? null
			: await participantsDB.event(user.aetosMind['$collectionId'], user.aetosMind['$id']);
	const xploratus =
		user.xploratus === null
			? null
			: await participantsDB.event(user.xploratus['$collectionId'], user.xploratus['$id']);
	const aetosPath = await webAppDB.aetosPath();
	return new Response(JSON.stringify({ aetosPath, aetosMind, xploratus, user }), {
		headers: { 'Content-Type': 'application/json' }
	});
}
