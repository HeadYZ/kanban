/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		colors: {
			black: 'rgb(0,1,18)',
			'v-dark-grey': 'rgb(32,33,44)',
			'dark-grey': 'rgb(43,44,55)',
			'lines-dark': 'rgb(62,63,78)',
			'medium-grey': 'rgb(130,143,163)',
			'lines-light': 'rgb(228,235,250)',
			'light-grey': 'rgb(244,247,253)',
			white: 'rgb(255,255,255)',
			purple: 'rgb(99,95,199)',
			'purple-hover': 'rgb(168,164,255)',
			red: 'rgb(234,85,85)',
			'red-hover': 'rgb(255,152,152)',
		},
		extend: {
			spacing: {
				0.4: '0.4rem',
				0.6: '0.6rem',
				0.8: '0.8rem',
				1: '1rem',
				1.2: '1.2rem',
				1.5: '1.6rem',
				1.6: '1.6rem',
				1.8: '1.8rem',
				1.9: '1.9rem',
				2: '2rem',
				2.4: '2.4rem',
				2.5: '2.5rem',
				3: '3rem',
				3.2: '3.2rem',
				4: '4rem',
				4.8: '4.8rem',
				5: '5rem',
				6: '6rem',
				6.4: '6.4rem',
				17.4: '17.4rem',
				24: '24rem',
				calch: 'calc(100vh - 64px)',
			},
			fontSize: {
				sm: '0.8rem',
				base: '1rem',
				xl: '1.25rem',
				hl: ['1.8rem', { fontWeight: 'bold' }],
				hm: ['1.5rem', { fontWeight: 'bold' }],
				1.2: '1.2rem',
				'4xl': '2.441rem',
				'5xl': '3.052rem',
			},
			borderRadius: {
				none: '0',
				sm: '0.125rem',
				2.4: '2.4rem',
				DEFAULT: '4px',
				md: '0.375rem',
				lg: '0.5rem',
				full: '9999px',
				large: '12px',
			},
			screens: {
				sm: '640px',
				// => @media (min-width: 640px) { ... }

				md: '768px',
				// => @media (min-width: 768px) { ... }

				lg: '1024px',
				// => @media (min-width: 1024px) { ... }
			},
			letterSpacing: {
				tight: '0.24rem',
			},
		},
	},
	plugins: [],
}
