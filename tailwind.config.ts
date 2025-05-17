/** @type { import('tailwindcss').Config } */

const generateSlideAnimations = (): Record<string, Record<string, Record<string, string>>> => {
    const directions = ['top', 'right', 'bottom', 'left']
    const result: Record<string, Record<string, Record<string, string>>> = {}

    directions.forEach(dir => {
        const axis = dir === 'top' || dir === 'bottom' ? 'Y' : 'X'
        const sign = dir === 'top' || dir === 'left' ? '-' : ''

        result[`${dir}Enter`] = {
            '0%': { transform: `translate${axis}(${sign}100%)` },
            '100%': { transform: `translate${axis}(0)` }
        }

        result[`${dir}Leave`] = {
            '0%': { transform: `translate${axis}(0)` },
            '100%': { transform: `translate${axis}(${sign}100%)` }
        }
    })

    return result
}

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
            },
            borderRadius: {
                'base': '6px',
            },
            columns: {
                '4xs': '14rem'
            },
            flexBasis: {
                'hh': '8rem'
            },
            fontFamily: {
                'ww': '华文新魏'
            },
            backgroundColor: {
                'half-gray': 'rgb(107 114 128 / 0.5)',
                'base-color': '#121212'
            },
            keyframes: generateSlideAnimations(),
            animation: {
                topEnter: 'topEnter 0.3s ease both',
                rightEnter: 'rightEnter 0.3s ease both',
                bottomEnter: 'bottomEnter 0.3s ease both',
                leftEnter: 'leftEnter 0.3s ease both',
                topLeave: 'topLeave 0.3s ease both',
                rightLeave: 'rightLeave 0.3s ease both',
                bottomLeave: 'bottomLeave 0.3s ease both',
                leftLeave: 'leftLeave 0.3s ease both',
            },
            boxShadow: {
                'base': '0 1px 5px 0 rgba(0, 0, 0, 0.1)',
            }
        },
    },
    plugins: [
        "prettier-plugin-tailwindcss", 
        function ({ addUtilities }: { addUtilities: (utilities: object) => void }) {
            addUtilities({
            '.text-stroke': {
                '-webkit-text-stroke-width': '2px',
                '-webkit-text-stroke-color': '#aaa',
            },
            '.text-stroke-dark': {
                '@media (prefers-color-scheme: dark)': {
                    opacity: '0.2',
                },
            },
            });
        },
    ],
}