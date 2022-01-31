const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: colors.blue,
				secondary: colors.red
			}
		},
		container: {
			center: true,
			padding: '1.25rem'
		}
	},

	plugins: []
};

module.exports = config;
