import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,ts}', './src/**/*.html', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#ff56f8',
        secondary: '#00bee0',
      },
      fontFamily: {
        pixelify: ['Pixelify', 'sans-serif'],
        luciole: ['Luciole', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
