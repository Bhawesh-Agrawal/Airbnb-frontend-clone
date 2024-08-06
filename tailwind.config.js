/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,rsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        airbnb : ["airbnb", "sans-serif"]
      }
    },
  },
  plugins: [],
}

