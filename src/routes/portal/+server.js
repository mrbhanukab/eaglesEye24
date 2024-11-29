import { webAppDB } from '$lib/server/database.js';

export async function GET() {
	const aetosPath = await webAppDB.aetosPath();
	return new Response(JSON.stringify(aetosPath), {
		headers: { 'Content-Type': 'application/json' }
	});
}
