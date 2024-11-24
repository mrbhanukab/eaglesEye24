import { databases } from '$lib/AppWrite/appwrite.js';
import {Permission, Role} from 'appwrite'

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