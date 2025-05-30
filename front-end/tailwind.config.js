/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 👇 add this line
    "./node_modules/@nextui-org/react/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
