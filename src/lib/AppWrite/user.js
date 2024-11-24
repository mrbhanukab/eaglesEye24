import { account } from './appwrite';
import { ID } from 'appwrite';
import {participantsDB} from '$lib/AppWrite/database.js';

export const user = {
 createOtp: async (email) => {
  return await account.createEmailToken(ID.unique(), email, true);
 },

 createUser: async (data, session, otp) => {
  await account.createSession(session.userId, otp);
  await account.updateName(data.Name);
  await account.updatePhone(data.Whatsapp, '11111111');
  await participantsDB.newUser(session.userId, data);
 },

 getCurrentSession: async () => {
  try {
   return await account.getSession('current');
  } catch (error) {
   return null;
  }
 },

 getUser: async () => {
  return await account.get();
 },

 login: async (userId, secret) => {
  return  await account.createSession(userId, secret);
 },

 logout: async () => {
  await account.deleteSession('current');
 },

 // updateUserDetails: async (userId, gender, school) => {
 //  return await databases.createDocument(userDatabaseId, userCollectionId, userId, {
 //   gender: gender,
 //   school: school,
 //  });
 // }
};
