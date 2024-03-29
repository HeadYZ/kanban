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
				0.5: '0.5rem',
				0.6: '0.6rem',
				0.8: '0.8rem',
				1: '1rem',
				1.2: '1.2rem',
				1.4: '1.4rem',
				1.5: '1.5rem',
				1.6: '1.6rem',
				1.8: '1.8rem',
				1.9: '1.9rem',
				2: '2rem',
				2.3: '2.3rem',
				2.4: '2.4rem',
				2.5: '2.5rem',
				2.6: '2.6rem',
				3: '3rem',
				3.2: '3.2rem',
				3.4: '3.4rem',
				4: '4rem',
				4.8: '4.8rem',
				5: '5rem',
				5.4: '5.4rem',
				5.6: '5.6rem',
				6: '6rem',
				6.4: '6.4rem',
				8: '8rem',
				9.6: '9.6rem',
				16.4: '16.4rem',
				17.4: '17.4rem',
				23.5: '23.5rem',
				23.7: '23.7rem',
				24: '24rem',
				25.1: '25.1rem',
				26.1: '26.1rem',
				26.4: '26.4rem',
				26.6: '26.6rem',
				27.6: '27.6rem',
				28: '28rem',
				30: '30rem',
				'minus5.6': '-5.6rem',
				wcalc: 'calc(100vw)',
				calchs: 'calc(100vh - 64px)',
				calcshm: 'calc(100svh - 80px)',
				calcshl: 'calc(100svh - 96px)',
			},
			fontSize: {
				sm: '0.8rem',
				base: '1rem',
				xl: '1.25rem',
				hs: ['1.2rem', { fontWeight: 'bold', lineHeight: '1.5rem', letterSpacing: '2.4px' }],
				hm: ['1.5rem', { fontWeight: 'bold', lineHeight: '1.9rem' }],
				hl: ['1.8rem', { fontWeight: 'bold', lineHeight: '2.3rem' }],
				hxl: ['2.4rem', { fontWeight: 'bold', lineHeight: '3rem' }],
				bodym: ['1.2rem', { fontWeight: 'bold', lineHeight: '2.3rem' }],
				bodyl: ['1.3rem', { lineHeight: '1.5rem' }],
			},
			borderRadius: {
				none: '0',
				sm: '0.125rem',
				2.4: '2.4rem',
				0.6: '0.6rem',
				0.8: '0.8rem',
				1.2: '1.2rem',
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
		gridTemplateColumns: {
			2: 'auto 1fr',
		},
		gridTemplateRows: {
			2: 'auto 1fr',
		},
		screens: {
			tablet: '660px',
		},
		translate: {
			30: '-30rem',
			26.1: '-26.1rem',
		},
	},
	plugins: [],
}
