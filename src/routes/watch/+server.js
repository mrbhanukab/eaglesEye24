import { webAppDB } from '$lib/server/database.js';

export async function GET({ params, url }) {
	const lecture = url.searchParams.get('lecture');
	const details = await webAppDB.youtubeDetails(lecture);
	return new Response(JSON.stringify(details), {
		headers: { 'Content-Type': 'application/json' }
	});
}
