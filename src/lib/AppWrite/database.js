import { databases } from '$lib/AppWrite/appwrite.js';
import {Permission, Role, Query} from 'appwrite'

export const participantsDB = {
  db: "67432716003c763098ad",
  newUser: async (userid, data) => {
    return databases.createDocument(
      participantsDB.db,
      '674328d30039c666c4c5',
      userid,
      JSON.stringify(data),
      [
        Permission.read(Role.any()),
        Permission.write(Role.user(userid))
      ]
    );
  }
};

export const webAppDB = {
  db: "6743401c003bddaf96e6",
  aetosPath: async (userid, data) => {
    return databases.listDocuments(webAppDB.db, '67442cd4002dff4265c2');
  },
  youtubeDetails:async (id) => {
    return databases.listDocuments(webAppDB.db, '67442cd4002dff4265c2',     [
      Query.contains('youtube', id),
    ]);
  }
};