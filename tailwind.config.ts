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
            }
        },
    },
    plugins: ["prettier-plugin-tailwindcss"],
}