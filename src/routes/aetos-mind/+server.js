import { participantsDB, webAppDB } from '$lib/server/database.js';
import { AppwriteException } from 'node-appwrite';

export async function GET({ url }) {
	const errors = [];
	const data = Object.fromEntries(url.searchParams.entries());
	console.log('GET: \n', data);

	if (data.event === 'account') {
		if (data.action === 'register') errors.push(...(await checkDataWhenRegister(data)));
		if (data.action === 'login') errors.push(...(await checkDataWhenLogin(data)));
		return new Response(JSON.stringify({ errors }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} else if (data.event === 'team') {
		const response = await participantsDB.createTeam(data, data.event);
		return new Response(JSON.stringify(response), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
	if (data.event === 'user') {
		const account = await participantsDB.getAccount(data.id);
		const aetosmind = await webAppDB.flags([['name', 'aetos-mind']]);

		return new Response(JSON.stringify({ account, aetosmind }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
}

export async function POST({ request }) {
	const errors = [];
	const receivedData = await request.json();
	const event = receivedData.data?.event ?? receivedData.event;
	console.log('POST: \n', receivedData);

	if (event === 'account') {
		// Map the received data to the required format
		const mappedData = {
			Name: receivedData.data.name,
			Email: receivedData.data.email,
			Birthday: receivedData.data.birthday,
			Gender: receivedData.data.gender,
			'School-University': receivedData.data.school,
			Whatsapp: receivedData.data.whatsapp
		};

		try {
			if (receivedData.data.event === 'account') {
				await participantsDB.newUser(receivedData.userId, mappedData);
			}
			return new Response(JSON.stringify({ status: 'okay', errors: [] }), {
				headers: { 'Content-Type': 'application/json' }
			});
		} catch (err) {
			errors.push(err.message);
			return new Response(JSON.stringify({ status: 'error', errors }), {
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}

	if (event === 'team') {
		try {
			const userId = receivedData.userId;
			const user = await participantsDB.getAccount(userId);

			if (!user) {
				errors.push('User not found');
				console.error('User not found');
			} else {
				const members = [];
				for (let i = 2; receivedData[`member${i}`]; i++) {
					const memberId = receivedData[`member${i}`];
					try {
						const member = await participantsDB.getAccount(memberId);
						console.log('Member ', i, ' :', member);
						if (member.aetosMind !== null) {
							errors.push(`Member with ID '${memberId}' already belongs to a team`);
						} else {
							members.push(memberId);
						}
					} catch (err) {
						if (err instanceof AppwriteException && err.code === 404) {
							errors.push(`Member ${i} with ID '${memberId}' not found`);
							console.error(`Member with ID '${memberId}' not found`);
						} else {
							throw err;
						}
					}
				}

				if (errors.length === 0) {
					const teamData = {
						team: `${receivedData.school} ${receivedData.team}`,
						leader: userId,
						members: [userId, ...members]
					};
					console.info('Creating team:', teamData);
					const databaseResponse = await participantsDB.createTeam(teamData, event);
					console.info('Database response:', databaseResponse);
					return new Response(JSON.stringify({ success: true }), {
						headers: { 'Content-Type': 'application/json' }
					});
				}
			}

			return new Response(JSON.stringify({ success: false, errors }), {
				headers: { 'Content-Type': 'application/json' }
			});
		} catch (err) {
			errors.push(err.message);
			console.error('Error processing form data:', err);
			return new Response(JSON.stringify({ success: false, errors }), {
				headers: { 'Content-Type': 'application/json' }
			});
		}
	}
}

async function checkDataWhenLogin(data) {
	const errors = [];

	// Check if email exists
	if ((await participantsDB.searchUsers([['Email', data.email]])).total === 0)
		errors.push('An account for the email you entered does not exist!');

	return errors;
}

async function checkDataWhenRegister(data) {
	const errors = [];
	// Validate Whatsapp number
	const whatsappPattern = /^\+94\d{9}$/;
	if (!whatsappPattern.test(data.whatsapp)) {
		errors.push('Wrong Whatsapp Number.');
	} else {
		// Check if phone number already exists
		if ((await participantsDB.searchUsers([['Whatsapp', data.whatsapp]])).total > 0) {
			errors.push('The Whatsapp number you entered already exists');
		}
	}

	// Check if email already exists
	if ((await participantsDB.searchUsers([['Email', data.email]])).total > 0) {
		errors.push('The email you entered already exists');
	}

	return errors;
}
