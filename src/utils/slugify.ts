export type Stringer<T> = (x: T, ...xs: any[]) => string

const src = "àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;"
const dest = "aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------"
const re = new RegExp(src.split("").join("|"), "g")

/**
 * Based on:
 * {@link https://medium.com/@matthagemann/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1}
 *
 * @example
 * ```ts
 * slugify("Me, myself (& ëye)!")
 * // "me-myself-and-eye"
 * ```
 *
 * @param str -
 */
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(re, (c) => dest[src.indexOf(c)])
    .replace(/&+/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-{2,}/g, "-")
    .replace(/(^-+)|(-+$)/g, "")
}

export const formatStringAsSlug: Stringer<string> = slugify
