/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gainsboro: {
          "100": "#d9d9d9",
          "200": "rgba(230, 230, 230, 0.2)",
        },
        gray: "rgba(255, 255, 255, 0.2)",
        limegreen: {
          "100": "#57da36",
          "200": "#24a803",
        },
        "colors-white-white": "#fff",
        darkslateblue: {
          "100": "#8660a9",
          "200": "#21294c",
        },
        plum: "#a17ac2",
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
      "5xl": "24px",
      lgi: "19px",
      "13xl": "32px",
      "7xl": "26px",
      "45xl": "64px",
      "19xl": "38px",
      "32xl": "51px",
      inherit: "inherit",
    },
    screens: {
      l: {
        raw: "screen and (max-width: 950px)",
      },
      m: {
        raw: "screen and (max-width: 700px)",
      },
      s: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
