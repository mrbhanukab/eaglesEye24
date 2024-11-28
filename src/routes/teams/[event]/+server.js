import {participantsDB} from '$lib/server/database.js';
import { error } from '@sveltejs/kit';

export async function GET({ params, url }) {
  const id = url.searchParams.get('id');
	const user = await participantsDB.getAccount(id);
	if (!user) error("406", "User not found");

if (user[params.event] !== null){
	return new Response(JSON.stringify({allowed: false}), {
		headers: { 'Content-Type': 'application/json' }
	});
}
console.log('User:', user.Name);

	console.log('Session ID:', id);
	console.log('Event:', params.event);
  return new Response(JSON.stringify({allowed: true, name:user.Name}), {
		headers: { 'Content-Type': 'application/json' }
	});
}

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Rearrange data into the desired document format
    const document = {
      team: data['Team Name'],
      members: [],
      accepted: [data.userId]
    };

    // Extract member IDs
    Object.keys(data).forEach(key => {
      if (key.startsWith('Member ')) {
        document.members.push(data[key]);
      }
    });

    const databaseResponse = await participantsDB.createTeam(document, data.event);
		console.log('Database Response:', databaseResponse);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error processing form data:', err);
    throw error(500, 'Internal Server Error');
  }
}