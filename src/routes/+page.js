export const ssr = false;

export async function load() {
	const response = await fetch(`/`);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	const lectures = await response.json();
	return { lectures };
}
