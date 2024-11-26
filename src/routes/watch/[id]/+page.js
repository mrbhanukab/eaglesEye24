import { webAppDB } from '$lib/AppWrite/database.js';

export async function load({ params }) {
  const details = await webAppDB.youtubeDetails(params.id);

  if (details.total === 0) {
    throw new Error(404, 'Not Found');
  }

  return { id: params.id, title: details.documents[0].Title, lecture: details.documents[0].lecture };
}