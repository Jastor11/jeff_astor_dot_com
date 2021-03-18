function importAll(r: any) {
  return r.keys().map(r)
}

export const svg = importAll(require.context("./svg", false, /\.(png|jpe?g|svg)$/))
export const css = importAll(require.context("./css", false, /\.(css)$/))
export const images = importAll(require.context("./images", false, /\.(png|jpe?g|svg|gif)$/))
export const icons = importAll(require.context("./icons", false, /\.(svg)$/))
