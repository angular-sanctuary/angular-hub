const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff56f8',
        secondary: '#00bee0',
      },
      backgroundColor: {
        primary: '#ff56f8',
        secondary: '#00bee0',
      },
      borderColor: {
        primary: '#ff56f8',
        secondary: '#00bee0',
      },
    },
  },
  plugins: [],
};
