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
        lightpurple: "#BAA5CE",
        purple: "#8660A9",
        green: "#57DA36",
        palevioletred: "#b54272",
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
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      '4xl': '2rem',
      'full': '9999px',
      'large': '12px',
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
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
