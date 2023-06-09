/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#2F2F30",
        "border-bg": "#D8D8D8",
        dark: "#1A1A1B",
        "input-box": "#353B47",
        "price-green": "#21CE99",
        "primary-gray": "#F2F2F2",
        "dark-background": "#1C1E29",
      },
      maxWidth: {
        "screen-content": "76.125rem", //87rem
        539: "33.6875rem",
      },
    },
  },
  plugins: [],
};
