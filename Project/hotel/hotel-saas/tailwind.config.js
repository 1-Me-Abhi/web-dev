/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: 'var(--text-accent)',
        primary: {
          DEFAULT: 'var(--bg-primary)',
          dark: 'var(--bg-secondary)',
        },
        secondary: {
          DEFAULT: 'var(--bg-secondary)',
          dark: 'var(--bg-accent)',
        },
      },
      backgroundColor: {
        primary: 'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        accent: 'var(--bg-accent)',
        card: 'var(--card-bg)',
        nav: 'var(--nav-bg)',
        footer: 'var(--footer-bg)',
      },
      textColor: {
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        accent: 'var(--text-accent)',
      },
      borderColor: {
        DEFAULT: 'var(--border-color)',
      },
      boxShadow: {
        card: '0 4px 6px var(--shadow-color)',
      },
    },
  },
  plugins: [],
} 