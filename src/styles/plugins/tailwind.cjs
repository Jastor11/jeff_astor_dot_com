// const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

const customFontNames = {
  text: "Plus Jakarta Sans",
  heading: "TT First Neue",
  mono: "IBM Plex Mono",
}

const cssVariableColorNames = [
  { value: "--light", label: "light" },
  { value: "--dark", label: "dark" },
  { value: "--less-dark", label: "less-dark" },
  { value: "--even-less-dark", label: "even-less-dark" },
  { value: "--secondary", label: "secondary" },
  { value: "--accent", label: "accent" },
  { value: "--accent-light", label: "accent-light" },
  { value: "--neon-blue", label: "neon-blue" },
  { value: "--darker-neon-blue", label: "darker-neon-blue" },
]

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => `rgba(var(${variable}), ${opacityValue ?? 1})`
}

const colorMapping = cssVariableColorNames.reduce(
  (mapping, variable) => ({ ...mapping, [variable.value.slice(2)]: withOpacityValue(variable.value) }),
  {}
)

const createPercentSizeCalculationMapping = (baseValue, numSections = 20, prefix = "screen") =>
  new Array(numSections).fill(0).reduce((mapping, _, i) => {
    const stepSize = Number(Number(100 / numSections).toFixed(0))
    const perc = (i + 1) * stepSize
    const className = `${prefix}-${perc}%`
    const value = `calc(${baseValue} * ${Number(perc * 0.01).toFixed(2)})`

    return {
      ...mapping,
      [className]: value,
    }
  }, {})

const customHeights = createPercentSizeCalculationMapping("100vh")
const customWidths = createPercentSizeCalculationMapping("100vw")

/**
 * ## GRID AUTO FIT PLUGIN
 *
 * Changing the grid item size
 *
 * Use utilities like .grid-auto-fit-sm, .grid-auto-fit-xl to change the minimum and maximum item size of the responsive grid.
 * This plugin includes five item sizes with the default minimum size being 16rem.
 *
 * Class 	                           Minimum item width
 * grid-auto-fit-xs 	                 12rem
 * grid-auto-fit-sm 	                 14rem
 * grid-auto-fit or grid-auto-fit-md  16rem
 * grid-auto-fit-lg 	                 18rem
 * grid-auto-fit-xl 	                 20rem
 */
const gridAutoFitPlugin = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        "grid-auto-fit": (value) => ({
          gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
        }),
      },
      { values: theme("gridAutoFit") }
    )
  },
  {
    theme: {
      gridAutoFit: {
        DEFAULT: "16rem",
        "6xs": "2rem",
        "5xs": "4rem",
        "4xs": "6rem",
        "3xs": "8rem",
        "2xs": "10rem",
        xs: "12rem",
        sm: "14rem",
        md: "16rem",
        lg: "18rem",
        xl: "20rem",
        "2xl": "22rem",
        "3xl": "24rem",
        "4xl": "26rem",
        "5xl": "28rem",
        "6xl": "30rem",
      },
    },
  }
)

function filterDefault(values) {
  return Object.fromEntries(Object.entries(values).filter(([key]) => key !== "DEFAULT"))
}

const addAnimationPlugin = plugin(
  ({ addUtilities, matchUtilities, theme }) => {
    // ANIMATE
    addUtilities({
      "@keyframes enter": theme("keyframes.enter"),
      "@keyframes exit": theme("keyframes.exit"),
      ".animate-in": {
        animationName: "enter",
        animationDuration: theme("animationDuration.DEFAULT"),
        "--tw-enter-opacity": "initial",
        "--tw-enter-scale": "initial",
        "--tw-enter-rotate": "initial",
        "--tw-enter-translate-x": "initial",
        "--tw-enter-translate-y": "initial",
      },
      ".animate-out": {
        animationName: "exit",
        animationDuration: theme("animationDuration.DEFAULT"),
        "--tw-exit-opacity": "initial",
        "--tw-exit-scale": "initial",
        "--tw-exit-rotate": "initial",
        "--tw-exit-translate-x": "initial",
        "--tw-exit-translate-y": "initial",
      },
    })

    // FADE
    matchUtilities(
      {
        "fade-in": (value) => ({ "--tw-enter-opacity": value }),
        "fade-out": (value) => ({ "--tw-exit-opacity": value }),
      },
      { values: theme("animationOpacity") }
    )

    // ZOOM
    matchUtilities(
      {
        "zoom-in": (value) => ({ "--tw-enter-scale": value }),
        "zoom-out": (value) => ({ "--tw-exit-scale": value }),
      },
      { values: theme("animationScale") }
    )

    // SPIN
    matchUtilities(
      {
        "spin-in": (value) => ({ "--tw-enter-rotate": value }),
        "spin-out": (value) => ({ "--tw-exit-rotate": value }),
      },
      { values: theme("animationRotate") }
    )

    // SLIDE
    matchUtilities(
      {
        "slide-in-from-top": (value) => ({
          "--tw-enter-translate-y": `-${value}`,
        }),
        "slide-in-from-bottom": (value) => ({
          "--tw-enter-translate-y": value,
        }),
        "slide-in-from-left": (value) => ({
          "--tw-enter-translate-x": `-${value}`,
        }),
        "slide-in-from-right": (value) => ({
          "--tw-enter-translate-x": value,
        }),
        "slide-out-to-top": (value) => ({
          "--tw-exit-translate-y": `-${value}`,
        }),
        "slide-out-to-bottom": (value) => ({
          "--tw-exit-translate-y": value,
        }),
        "slide-out-to-left": (value) => ({
          "--tw-exit-translate-x": `-${value}`,
        }),
        "slide-out-to-right": (value) => ({
          "--tw-exit-translate-x": value,
        }),
      },
      { values: theme("animationTranslate") }
    )

    matchUtilities(
      { duration: (value) => ({ animationDuration: value }) },
      { values: filterDefault(theme("animationDuration")) }
    )

    matchUtilities({ delay: (value) => ({ animationDelay: value }) }, { values: theme("animationDelay") })

    matchUtilities(
      { ease: (value) => ({ animationTimingFunction: value }) },
      { values: filterDefault(theme("animationTimingFunction")) }
    )

    addUtilities({
      ".running": { animationPlayState: "running" },
      ".paused": { animationPlayState: "paused" },
    })

    matchUtilities({ "fill-mode": (value) => ({ animationFillMode: value }) }, { values: theme("animationFillMode") })

    matchUtilities({ direction: (value) => ({ animationDirection: value }) }, { values: theme("animationDirection") })

    matchUtilities({ repeat: (value) => ({ animationIterationCount: value }) }, { values: theme("animationRepeat") })
  },
  {
    theme: {
      extend: {
        animationDelay: ({ theme }) => ({
          ...theme("transitionDelay"),
        }),
        animationDuration: ({ theme }) => ({
          0: "0ms",
          ...theme("transitionDuration"),
        }),
        animationTimingFunction: ({ theme }) => ({
          ...theme("transitionTimingFunction"),
        }),
        animationFillMode: {
          none: "none",
          forwards: "forwards",
          backwards: "backwards",
          both: "both",
        },
        animationDirection: {
          normal: "normal",
          reverse: "reverse",
          alternate: "alternate",
          "alternate-reverse": "alternate-reverse",
        },
        animationOpacity: ({ theme }) => ({
          DEFAULT: 0,
          ...theme("opacity"),
        }),
        animationTranslate: ({ theme }) => ({
          DEFAULT: "100%",
          ...theme("translate"),
        }),
        animationScale: ({ theme }) => ({
          DEFAULT: 0,
          ...theme("scale"),
        }),
        animationRotate: ({ theme }) => ({
          DEFAULT: "30deg",
          ...theme("rotate"),
        }),
        animationRepeat: {
          0: "0",
          1: "1",
          infinite: "infinite",
        },
        keyframes: {
          enter: {
            from: {
              opacity: "var(--tw-enter-opacity, 1)",
              transform:
                "translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0))",
            },
          },
          exit: {
            to: {
              opacity: "var(--tw-exit-opacity, 1)",
              transform:
                "translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0))",
            },
          },
        },
      },
    },
  }
)

module.exports = {
  customFontNames,
  cssVariableColorNames,
  withOpacityValue,
  colorMapping,
  createPercentSizeCalculationMapping,
  customHeights,
  customWidths,
  gridAutoFitPlugin,
  addAnimationPlugin,
}
