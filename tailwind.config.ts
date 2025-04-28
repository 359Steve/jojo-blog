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
            }
        },
    },
    plugins: ["prettier-plugin-tailwindcss"],
}