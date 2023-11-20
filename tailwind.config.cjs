const defaultTheme = require("tailwindcss/defaultTheme")
const plugins = require("./src/styles/plugins/tailwind.cjs")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,md,mdx,ts,tsx}"],
  corePlugins: {
    float: false,
  },
  theme: {
    extend: {
      screens: {
        zero: "0px",
        one: "100px",
        two: "200px",
        three: "300px",
        mobile: "325px",
        four: "400px",
        xs: "475px",
        five: "500px",
        six: "600px",
        sm: defaultTheme.screens["sm"], // 640px
        seven: "700px",
        md: defaultTheme.screens["md"], // 768px
        eight: "800px",
        tablet: "900px",
        nine: "900px",
        ten: "1000px",
        lg: defaultTheme.screens["lg"], // 1024px
        eleven: "1100px",
        twelve: "1200px",
        xl: defaultTheme.screens["xl"], // 1280px
        "2xl": defaultTheme.screens["2xl"], // 1536px
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      colors: (theme) => ({
        black: plugins.withOpacityValue("--black"),
        ...plugins.colorMapping,
        ...defaultTheme.colors,
      }),
      fontSize: ({ theme }) => ({
        "3xs": "0.5rem",
        "2xs": "0.6rem",
        ...defaultTheme.fontSize,
      }),
      fontFamily: ({ theme }) => ({
        ...theme,
        sans: [plugins.customFontNames.text, ...defaultTheme.fontFamily["sans"]],
        serif: [plugins.customFontNames.heading, ...defaultTheme.fontFamily["serif"]],
        heading: [plugins.customFontNames.heading, ...defaultTheme.fontFamily["serif"]],
        display: [plugins.customFontNames.heading, ...defaultTheme.fontFamily["serif"]],
        mono: [plugins.customFontNames.mono, ...defaultTheme.fontFamily["mono"]],
      }),
      borderColor: ({ theme }) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.gray.200", "currentColor"),
      }),
      borderOpacity: ({ theme }) => theme("opacity"),
      borderRadius: (theme) => ({
        "50-percent": "50%",
        ...defaultTheme.borderRadius,
      }),
      spacing: ({ theme }) => ({
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        ...defaultTheme.spacing,
      }),
      height: ({ theme }) => ({
        ...plugins.customHeights,
        ...defaultTheme.height,
      }),
      minHeight: ({ theme }) => ({
        ...theme("spacing"),
        ...plugins.customHeights,
        ...defaultTheme.minHeight,
      }),
      minWidth: ({ theme }) => ({
        ...theme("spacing"),
        ...plugins.customWidths,
        ...defaultTheme.minWidth,
      }),
      maxHeight: ({ theme }) => ({
        ...theme("spacing"),
        ...plugins.customHeights,
        ...defaultTheme.maxHeight,
      }),
      maxWidth: ({ theme }) => ({
        ...theme("spacing"),
        ...plugins.customWidths,
        ...defaultTheme.maxWidth,
      }),
      animation: ({ theme }) => ({
        "spin-funky": "spin-funky 1s linear infinite",
        ...defaultTheme.animation,
      }),
      gridRow: {
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
        "span-11": "span 11 / span 11",
        "span-12": "span 12 / span 12",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
      },
      gridRowEnd: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
      },
    },
  },
  plugins: [plugins.addAnimationPlugin, plugins.gridAutoFitPlugin],
}
