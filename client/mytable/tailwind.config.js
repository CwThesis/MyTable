/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    "./src/**/*.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/components/icons/HelloWorld.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [import("@tailwindcss/forms")],
};
