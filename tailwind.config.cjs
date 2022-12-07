/** @type {import('tailwindcss').Config} */
module.exports = {
	corePlugins: {
		preflight: false
	},
	prefix: 'tw-',
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				'bg-gray': '#121212'
			}
		}
	},
	plugins: []
};
