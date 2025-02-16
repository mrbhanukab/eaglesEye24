import { databases } from '$lib/server/appwrite-server.js';
import { AppwriteException, ID, Permission, Query, Role } from 'appwrite';
import { DATABASES } from '$env/static/private';

const parsedDatabases = JSON.parse(DATABASES);

function toUTC(dateString) {
	return new Date(dateString).toISOString();
}

export const participantsDB = {
	getAccount: async (id) => {
		try {
			return await databases.getDocument(
				parsedDatabases.participants.DB,
				parsedDatabases.participants.accounts,
				id
			);
		} catch (err) {
			if (err instanceof AppwriteException && err.code === 404) {
				throw new Error(`User with ID '${id}' not found`);
			}
			throw err;
		}
	},

	createTeam: async (data) => {
		return databases.createDocument(
			parsedDatabases.participants.DB,
			parsedDatabases.participants.aetosMind,
			ID.unique(),
			data
		);
	},

	searchUsers: async (queries) => {
		return databases.listDocuments(
			parsedDatabases.participants.DB,
			parsedDatabases.participants.accounts,
			[...queries.map(([contains, query]) => Query.contains(contains, query))]
		);
	},

	searchUserWithExactly: async (queries) => {
		return databases.listDocuments(
			parsedDatabases.participants.DB,
			parsedDatabases.participants.accounts,
			[...queries.map(([contains, query]) => Query.equal(contains, query))]
		);
	},

	newUser: async (userid, data) => {
		return databases.createDocument(
			parsedDatabases.participants.DB,
			parsedDatabases.participants.accounts,
			userid,
			JSON.stringify(data),
			[Permission.read(Role.any()), Permission.write(Role.user(userid))]
		);
	},

	aetosMind: async (documentID) => {
		const event = await databases.getDocument(
			parsedDatabases.participants.DB,
			parsedDatabases.participants.aetosMind,
			documentID
		);

		return {
			team: event.team,
			members: [
				event.members.find((member) => member.$id === event.leader).Name,
				...event.members
					.filter((member) => member.$id !== event.leader)
					.map((member) => member.Name)
			]
		};
	}
};

export const webAppDB = {
	aetosPath: async () => {
		return (
			await databases.listDocuments(parsedDatabases.webapp.DB, parsedDatabases.webapp.Aetos_Path)
		).documents;
	},

	flags: async (queries) => {
		return (
			await databases.listDocuments(parsedDatabases.webapp.DB, parsedDatabases.webapp.flags, [
				...queries.map(([contains, query]) => Query.contains(contains, query))
			])
		).documents;
	}
};
