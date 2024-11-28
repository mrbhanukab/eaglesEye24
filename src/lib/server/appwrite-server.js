// src/lib/server/appwrite.js
import { Client, Account, Databases, Storage } from 'node-appwrite';
import { API_KEY } from '$env/static/private';
import { PUBLIC_PROJECT_ID } from '$env/static/public';

const client = new Client()
		.setEndpoint('https://cloud.appwrite.io/v1')
		.setProject(PUBLIC_PROJECT_ID)
		.setKey(API_KEY);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);