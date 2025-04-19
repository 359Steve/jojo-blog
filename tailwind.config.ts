/** @type { import('tailwindcss').Config } */

export default {
    content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                'base': '6px',
            }
        },
    },
    plugins: ["prettier-plugin-tailwindcss"],
}