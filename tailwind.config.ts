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
				'mobile-pad': '480px',
				'admin-lg': '1180px',
				'admin-md': '968px'
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
				ww: '华文新魏',
				cmm: 'Consolas,Monaco,monospace'
			},
			backgroundColor: {
				'half-gray': 'rgb(107 114 128 / 0.5)',
				'base-color': '#121212',
				'admin-sub-menu-active-text': 'var(--jojo-admin-sub-menu-active-text)',
				'admin-main-bg': 'var(--jojo-main-bg)',
				'admin-menu-bg': 'var(--jojo-admin-menu-bg)',
				'admin-menu-hover': 'var(--jojo-admin-menu-hover)',
				'admin-sub-menu-bg': 'var(--jojo-admin-sub-menu-bg)',
				'admin-menu-text': 'var(--jojo-admin-menu-text)',
				'admin-sidebar-logo': 'var(--jojo-admin-sidebar-logo)',
				'admin-menu-title-hover': 'var(--jojo-admin-menu-title-hover)',
				'admin-menu-active-before': 'var(--jojo-admin-menu-active-before)',
				'admin-tag-active-bg': 'var(--jojo-admin-menu-active-before)',
				'admin-header-bg-hover': 'var(--jojo-admin-menu-hover)',
				'admin-dropdown-menu-bg': 'var(--jojo-admin-dropdown-menu-bg)',

				'blog-base-color': 'var(--jojo-blog-base-color)'
			},
			textColor: {
				'admin-tag-text': 'var(--jojo-admin-menu-text)',
				'admin-tag-active-text': 'var(--jojo-admin-menu-active-before)',
				'admin-sub-menu-active-text': 'var(--jojo-admin-sub-menu-active-text)',
				'admin-menu-text': 'var(--jojo-admin-menu-text)',
				'admin-menu-title-hover': 'var(--jojo-admin-menu-title-hover)',
				'admin-menu-disabled-text': 'var(--jojo-admin-text-color-disabled)'
			},
			borderColor: {
				'admin-menu-border': 'var(--jojo-admin-border-color)',
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
				base: '0 1px 5px 0 rgba(0, 0, 0, 0.1)',
				'admin-menu-shadow': '0 1px 5px 0 var(--jojo-admin-border-color)',
			}
		}
	},
	plugins: ['prettier-plugin-tailwindcss', addVariablesForColors]
};
