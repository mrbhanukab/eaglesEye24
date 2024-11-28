import {databases} from '$lib/server/appwrite-server.js';
import {Permission, Role, Query, ID} from 'appwrite'
import { DATABASES } from '$env/static/private';
const parsedDatabases = JSON.parse(DATABASES);

export const participantsDB = {
	getAccount: async (id) => {
		return databases.getDocument(parsedDatabases.participants.DB, parsedDatabases.participants.accounts, id);
	},

	createTeam: async (data, event) => {
		return databases.createDocument(parsedDatabases.participants.DB, (event === "Aetos Mind" ? parsedDatabases.participants.aetosMind : event === "Xploratus" ? parsedDatabases.participants.xploratus : "unkown"), ID.unique(),data);
	},
};

//
// export const webAppDB = {
// 	db: "6743401c003bddaf96e6",
// 	aetosPath: async (userid, data) => {
// 		return databases.listDocuments(webAppDB.db, '67442cd4002dff4265c2');
// 	},
// 	youtubeDetails:async (id) => {
// 		return databases.listDocuments(webAppDB.db, '67442cd4002dff4265c2',     [
// 			Query.contains('youtube', id),
// 		]);
// 	}
// };