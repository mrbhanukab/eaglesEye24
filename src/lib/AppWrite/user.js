import { account } from './appwrite';
import { ID } from 'appwrite';

export const user = {
 createOtp: async (email) => {
  return await account.createEmailToken(ID.unique(), email, true);
 },

 verifyOtp: async (userId, secret) => {
  return await account.createSession(userId, secret);
 },

 logout: async () => {
  await account.deleteSession('current');
 },

 getCurrentSession: async () => {
  try {
   return await account.getSession('current');
  } catch (error) {
   return null;
  }
 }
};