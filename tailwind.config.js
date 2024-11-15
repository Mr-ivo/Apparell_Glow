/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'primary': '#FF0080',
        'secondary': '#7928CA',
      },
      animation: {
        'shine': 'shine 1.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shine: {
          'from': { transform: 'translateX(-100%) rotate(45deg)' },
          'to': { transform: 'translateX(200%) rotate(45deg)' },
        },
        glow: {
          'from': {
            boxShadow: '0 0 10px #FF0080, 0 0 20px #7928CA, 0 0 30px #FF0080',
          },
          'to': {
            boxShadow: '0 0 20px #FF0080, 0 0 30px #7928CA, 0 0 40px #FF0080',
          },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
};
