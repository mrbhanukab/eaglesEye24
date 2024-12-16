import { databases } from '$lib/server/appwrite-server.js';
import { ID, Query } from 'appwrite';
import { DATABASES } from '$env/static/private';

const parsedDatabases = JSON.parse(DATABASES);

function toUTC(dateString) {
	return new Date(dateString).toISOString();
}

export const participantsDB = {
	getAccount: async (id) => {
		return databases.getDocument(
			parsedDatabases.participants.DB,
			parsedDatabases.participants.accounts,
			id
		);
	},

	createTeam: async (data, event) => {
		return databases.createDocument(
			parsedDatabases.participants.DB,
			parsedDatabases.participants[event],
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

	event: async (collectionID, documentID) => {
		const event = await databases.getDocument(
			parsedDatabases.participants.DB,
			collectionID,
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
		const currentTime = new Date().toISOString();
		const items = (
			await databases.listDocuments(parsedDatabases.webapp.DB, parsedDatabases.webapp.Aetos_Path)
		).documents;
		const archived = items.filter((item) => {
			const endDate = item.end ? toUTC(item.end) : null;
			return endDate && endDate < currentTime;
		});
		const upcoming = items.filter((item) => {
			const endDate = item.end ? toUTC(item.end) : null;
			return endDate && endDate >= currentTime;
		});
		const notFixed = items.filter((item) => item.start == null);
		archived.sort((a, b) => {
			const dateA = toUTC(a.start);
			const dateB = toUTC(b.start);
			return new Date(dateA) - new Date(dateB);
		});
		upcoming.sort((a, b) => {
			const dateA = toUTC(a.start || a.$createdAt);
			const dateB = toUTC(b.start || b.$createdAt);
			return new Date(dateA) - new Date(dateB);
		});

		notFixed.sort((a, b) => {
			const dateA = toUTC(a.$createdAt);
			const dateB = toUTC(b.$createdAt);
			return new Date(dateA) - new Date(dateB);
		});

		return { archived, upcoming, notFixed };
	},
	youtubeDetails: async (id) => {
		return databases.listDocuments(webAppDB.db, '67442cd4002dff4265c2', [
			Query.contains('youtube', id)
		]);
	}
};
