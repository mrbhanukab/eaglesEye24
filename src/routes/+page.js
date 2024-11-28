import { user } from '$lib/AppWrite/user.js';
import { goto } from '$app/navigation';

export const ssr = false;

export async function load({ params, fetch }) {
	if (await user.getCurrentSession() != null) await goto('/portal');
}

// import { user } from '$lib/AppWrite/user.js';
// import { goto } from '$app/navigation';
//
// export const ssr = false;
//
// export async function load(window) {
// 	const filesToCache = [
// 		{ name: 'aetos-mind.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e1400024238213f/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
// 		{ name: 'aetos-path.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e26002163de97f3/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
// 		{ name: 'newUser.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e33003dbffe0e4c/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
// 		{ name: 'verify.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e4100376276f370/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
// 		{ name: 'xploratus.jpeg', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433e58000c5d70ccc5/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' },
// 		{ name: 'logos.json', url: 'https://cloud.appwrite.io/v1/storage/buckets/6740230a002ce99c0cd2/files/67433d90001d87767130/download?project=673ee3e0000c8c3eef85&project=673ee3e0000c8c3eef85' }
// 	];
//
// 	// Max Age Is 2 Days
// 	const CACHE_MAX_AGE = 2 * 24 * 60 * 60 * 1000;
//
// 	async function checkSessionAndRedirect() {
// 		if (await user.getCurrentSession() != null) {
// 			await goto('/portal');
// 		}
// 	}
//
// 	async function cacheFiles() {
// 		const cache = await caches.open('home');
// 		for (const file of filesToCache) {
// 			const cachedResponse = await cache.match(file.url);
// 			if (cachedResponse) {
// 				const dateHeader = cachedResponse.headers.get('date');
// 				if (dateHeader) {
// 					const cachedTime = new Date(dateHeader).getTime();
// 					const currentTime = Date.now();
// 					if (currentTime - cachedTime < CACHE_MAX_AGE) continue; // Cache is still valid
// 				}
// 			}
//
// 			const response = await window.fetch(file.url);
// 			if (response.ok) await cache.put(file.url, response);
// 			else console.error(`Failed to fetch ${file.url}`);
// 		}
// 	}
//
// 	await checkSessionAndRedirect();
// 	await cacheFiles();
//
// 	return {
// 		props: {
// 			files: filesToCache,
// 			loading: false
// 		}
// 	};
// }