/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        limegreen: "#57da36",
        gray: "rgba(255, 255, 255, 0.2)",
        "colors-white-white": "#fff",
        darkslateblue: {
          "100": "#8660a9",
          "200": "#21294c",
          "300": "rgba(134, 96, 169, 0.57)",
        },
        whitesmoke: "#efefef",
        plum: {
          "100": "#a17ac2",
          "200": "rgba(161, 122, 194, 0.57)",
        },
        black: "#000",
        purple: "#8660A9",
        green: "#57DA36",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        montserrat: "Montserrat",
        Thai: "Mitr",
      },
      
      borderRadius: {
        "84xl": "103px",
        xl: "20px",
        "11xl": "30px",
      },
    },
    fontSize: {
      "2xl": "1.563rem",
      "5xl": "1.5rem",
      "13xl": "2rem",
      "45xl": "4rem",
      "3xs": "0.63rem",
      sm: "0.88rem",
      lg: "1.19rem",
      "7xl": "1.63rem",
      "19xl": "2.38rem",
      "32xl": "3.19rem",
      inherit: "inherit",
    },
    screens: {
      mq975: {
        raw: "screen and (max-width: 975px)",
      },
      md: {
        max: "960px",
      },
      mq950: {
        raw: "screen and (max-width: 950px)",
      },
      mq700: {
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
