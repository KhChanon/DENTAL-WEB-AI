/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkslateblue: {
          "100": "#8660a9",
          "200": "#21294c",
        },
        "colors-white-white": "#fff",
        limegreen: "#57da36",
        gray: "rgba(255, 255, 255, 0.2)",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        "84xl": "103px",
      },
    },
    fontSize: {
      "5xl": "1.5rem",
      inherit: "inherit",
    },
    screens: {
      md: {
        max: "960px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
