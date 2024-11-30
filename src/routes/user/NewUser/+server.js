import { participantsDB } from '$lib/server/database.js';
import { error } from '@sveltejs/kit';

/*
*? What Need to check/query?
* 1. Check If Phone Number is correct
* 2. Check If Email belongs to any documents
* 3. Check If PhoneNumber belongs to any documents
* */

export async function POST({ request }) {
  let errors = [];
  try {
    const formData = await request.formData();
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Validate Whatsapp number
    const whatsappPattern = /^\+94\d{9}$/;
    if (!whatsappPattern.test(data.Whatsapp)) {
      errors.push('Wrong Whatsapp Number.');
    } else {
      // Check if phone number already exists
      const phoneExists = await participantsDB.searchUsers([['Whatsapp', data.Whatsapp]]);
      if (phoneExists.total > 0) {
        errors.push('The Whatsapp number you entered already exists');
      }
    }

    // Check if email already exists
    const emailExists = await participantsDB.searchUsers([['Email', data.Email]]);
    if (emailExists.total > 0) {
      errors.push('The email you entered already exists');
    }

    return new Response(JSON.stringify({ errors }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Error processing form data:', err);
    throw error(500, 'Internal Server Error');
  }
}