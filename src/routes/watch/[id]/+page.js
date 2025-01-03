export const ssr = false;

export async function load({ params, fetch }) {
	const response = await fetch(`/watch?lecture=${params.id}`);
	const details = await response.json();

	if (details.total === 0) {
		throw new Error(404, 'Not Found');
	}

	return {
		id: params.id,
		title: details.documents[0].Title,
		lecture: details.documents[0].lecture
	};
}
