module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        carabinero: {
          green: {
            50: '#f0f9f4',
            100: '#dcf3e4',
            200: '#bae6cd',
            300: '#88d4ab',
            400: '#51ba82',
            500: '#2d9d63',
            600: '#1f7d4e',
            700: '#1a6440',
            800: '#175035',
            900: '#14422c',
          },
          gold: {
            50: '#fefce8',
            100: '#fef9c3',
            200: '#fef08a',
            300: '#fde047',
            400: '#facc15',
            500: '#eab308',
            600: '#ca8a04',
            700: '#a16207',
            800: '#854d0e',
            900: '#713f12',
          },
        },
      },
    },
  },
  plugins: [],
};
