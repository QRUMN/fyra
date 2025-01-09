/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#FAFAFA',
          red: '#DB5461',
          dark: '#292929',
          olive: '#4C4E46',
          lime: '#D4FF00',
          blue: '#93AEB8'
        }
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'card-dark': '0 4px 12px rgba(0, 0, 0, 0.2)',
        'card-dark-hover': '0 8px 24px rgba(0, 0, 0, 0.3)',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease': 'ease',
      }
    },
  },
  plugins: [],
};