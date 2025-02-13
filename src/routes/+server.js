import { webAppDB } from '$lib/server/database.js';
import { AetosMind } from '$lib/server/storage.js';

export async function GET({ params, url }) {
	const lectures = await webAppDB.aetosPath();
	const transformedLectures = await Promise.all(
		lectures.map(async (lecture) => {
			const imageBuffer = await AetosMind.getFile(lecture.Image);
			const imageBase64 = Buffer.from(imageBuffer).toString('base64');
			const imageWebp = `data:image/webp;base64,${imageBase64}`;

			return {
				title: lecture.Title,
				start: lecture.start,
				by: lecture.lecture,
				image: imageWebp,
				youtube: lecture.youtube
			};
		})
	);

	return new Response(JSON.stringify(transformedLectures), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
