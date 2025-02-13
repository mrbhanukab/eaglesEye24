import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				orbitron: ['Orbitron', 'serif']
			}
		}
	},

	plugins: [forms]
};
