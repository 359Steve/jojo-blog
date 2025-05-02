/** @type { import('tailwindcss').Config } */

export default {
    darkMode: 'class',
    content: [
        './pages/**/*.{vue,js,ts,jsx,tsx}',
        './components/**/*.{vue,js,ts,jsx,tsx}',
        './layouts/**/*.{vue,js,ts,jsx,tsx}',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
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
            keyframes: {
                'topEnter': {
                    '0%': {
                        transform: 'translateY(-100%)'
                    },
                    '100%': {
                        transform: 'translateY(0)'
                    }
                },
                'rightEnter': {
                    '0%': {
                        transform: 'translateX(100%)'
                    },
                    '100%': {
                        transform: 'translateY(0)'
                    }
                },
                'bottomEnter': {
                    '0%': {
                        transform: 'translateY(100%)'
                    },
                    '100%': {
                        transform: 'translateY(0)'
                    }
                },
                'leftEnter': {
                    '0%': {
                        transform: 'translateX(-100%)'
                    },
                    '100%': {
                        transform: 'translateX(0)'
                    }
                },
                'topLeave': {
                    '0%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                    '100%': {
                        transform: 'translateY(-100%)'
                    }
                },
                'rightLeave': {
                    '0%': {
                        transform: 'translateX(0)'
                    },
                    '100%': {
                        transform: 'translateX(100%)'
                    }
                },
                'bottomLeave': {
                    '0%': {
                        transform: 'translateY(0)'
                    },
                    '100%': {
                        transform: 'translateY(100%)'
                    }
                },
                'leftLeave': {
                    '0%': {
                        transform: 'translateX(0)'
                    },
                    '100%': {
                        transform: 'translateX(-100%)'
                    }
                }
            }
        },
    },
    plugins: ["prettier-plugin-tailwindcss"],
}