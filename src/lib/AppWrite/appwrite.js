import { PUBLIC_PROJECT_ID } from '$env/static/public';
import { Client, Account, Databases } from 'appwrite';

const client = new Client()
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(PUBLIC_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);