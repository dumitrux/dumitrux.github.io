/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        dark: {
          bg: '#000000',
          card: '#222222',
          border: '#333333',
          text: '#ffffff',
          muted: '#d4d4d4',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
