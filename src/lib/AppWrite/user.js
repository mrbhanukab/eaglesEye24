import { account } from './appwrite';
import { ID } from 'appwrite';

export const user = {
	createOtp: async (email) => {
		return await account.createEmailToken(ID.unique(), email, true);
	},

	createUser: async (data, session, otp, url) => {
		const errors = [];
		await account.updateName(data.name);
		await account.updatePhone(data.whatsapp, '11111111');

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// 'Access-Control-Allow-Origin': '*'
				},
				body: JSON.stringify({
					userId: session.userId,
					data: data
				})
			});

			if (!response.ok) {
				const errorText = await response.text();
				errors.push('Failed to create user:', errorText);
			}
		} catch (error) {
			errors.push('Error during POST request:', error);
		}
		return errors;
	},

	getCurrentSession: async () => {
		try {
			return await account.get();
		} catch (error) {
			console.error('Error fetching session:', error);
			return null;
		}
	},

	getUser: async () => {
		return await account.get();
	},

	login: async (userId, secret) => {
		return await account.createSession(userId, secret);
	},

	logout: async () => {
		await account.deleteSession('current');
	}
};
