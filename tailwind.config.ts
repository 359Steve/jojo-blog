/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const generateSlideAnimations = (): Record<string, Record<string, Record<string, string>>> => {
	const directions = ['top', 'right', 'bottom', 'left'];
	const result: Record<string, Record<string, Record<string, string>>> = {};

	directions.forEach(dir => {
		const axis = dir === 'top' || dir === 'bottom' ? 'Y' : 'X';
		const sign = dir === 'top' || dir === 'left' ? '-' : '';

		result[`${dir}Enter`] = {
			'0%': { transform: `translate${axis}(${sign}100%)` },
			'100%': { transform: `translate${axis}(0)` }
		};

		result[`${dir}Leave`] = {
			'0%': { transform: `translate${axis}(0)` },
			'100%': { transform: `translate${axis}(${sign}100%)` }
		};
	});

	return result;
};

const addVariablesForColors = ({ addBase, theme }: any) => {
	const allColors = flattenColorPalette(theme('colors'));
	const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));
	addBase({
		':root': newVars
	});
};

export default {
	darkMode: 'class',
	content: [
		'./pages/**/*.{vue,js,ts}',
		'./components/**/*.{vue,js,ts}',
		'./layouts/**/*.{vue,js,ts}',
		'./app.vue',
		'./nuxt.config.ts'
	],
	theme: {
		extend: {
			screens: {
				'mobile-pad': '480px'
			},
			borderRadius: {
				base: '6px'
			},
			columns: {
				'4xs': '14rem'
			},
			flexBasis: {
				hh: '8rem'
			},
			fontFamily: {
				ww: '华文新魏'
			},
			backgroundColor: {
				'half-gray': 'rgb(107 114 128 / 0.5)',
				'base-color': '#121212'
			},
			keyframes: {
				...generateSlideAnimations(),
				aurora: {
					from: {
						backgroundPosition: '50% 50%, 50% 50%'
					},
					to: {
						backgroundPosition: '350% 50%, 350% 50%'
					}
				},
				grow: {
					'0%': {
						strokeDasharray: '0 350px',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'40%': {
						strokeDasharray: '350px 0'
					},
					'100%': {
						strokeDasharray: '350px 0',
						opacity: '1'
					}
				},
				shrink: {
					'0%': {
						strokeDasharray: '350px 0',
						opacity: '1'
					},
					'99%': {
						strokeDasharray: '0 350px',
						opacity: '1'
					},
					'100%': {
						strokeDasharray: '0 350px',
						opacity: '0'
					}
				}
			},
			animation: {
				topEnter: 'topEnter 0.3s ease both',
				rightEnter: 'rightEnter 0.3s ease both',
				bottomEnter: 'bottomEnter 0.3s ease both',
				leftEnter: 'leftEnter 0.3s ease both',
				topLeave: 'topLeave 0.3s ease both',
				rightLeave: 'rightLeave 0.3s ease both',
				bottomLeave: 'bottomLeave 0.3s ease both',
				leftLeave: 'leftLeave 0.3s ease both',
				aurora: 'aurora 60s linear infinite',
				grow: 'grow 5s ease forwards',
				shrink: 'shrink 1s ease forwards'
			},
			boxShadow: {
				base: '0 1px 5px 0 rgba(0, 0, 0, 0.1)'
			}
		}
	},
	plugins: ['prettier-plugin-tailwindcss', addVariablesForColors]
};
