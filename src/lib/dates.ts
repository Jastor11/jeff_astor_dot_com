import { timeFormat as d3TimeFormat } from "d3-time-format"
import * as parseUtils from "@/utils/parse-utils"

type Datetime = Date | string | number

/**
 * Humanizes a duration via {@link ms} and returns the humanized version.
 * @param ms The duration to use
 * @param long If the output should be `$num $duration` (i.e, `1 year`) or not.
 */
export function humanize(ms: number, long: boolean = false) {
  const years = Math.floor(ms / 31104000000)
  const months = Math.floor((ms / 2592000000) % 12)
  const weeks = Math.floor((ms / 604800000) % 7)
  const days = Math.floor((ms / 86400000) % 30)
  const hours = Math.floor((ms / 3600000) % 24)
  const minutes = Math.floor((ms / 60000) % 60)
  const seconds = Math.floor((ms / 1000) % 60)

  const strings: string[] = []
  if (years > 0) strings.push(long ? pluralize("year", years) : `${years}y`)
  if (months > 0) strings.push(long ? pluralize("month", months) : `${months}mo`)
  if (weeks > 0) strings.push(long ? pluralize("week", weeks) : `${weeks}w`)
  if (days > 0) strings.push(long ? pluralize("day", days) : `${days}d`)
  if (hours > 0) strings.push(long ? pluralize("hour", hours) : `${hours}h`)
  if (minutes > 0) strings.push(long ? pluralize("minute", minutes) : `${minutes}m`)
  if (seconds > 0) strings.push(long ? pluralize("second", seconds) : `${seconds}s`)

  return strings.filter(Boolean).join(long ? ", " : "")
}

/**
 * Helper function to pluralize a number.
 * @param str The string to use when pluralizing the number.
 * @param value The actual number value.
 */
export function pluralize(str: string, value: number) {
  if (value === 0) return `${value} ${str}s`
  return value >= 1.5 ? `${value} ${str}s` : `${value} ${str}`
}

type DateTimePartsMapping = Record<Intl.DateTimeFormatPartTypes, Intl.DateTimeFormatPart["value"]>

const toPartsDateTimeFormatterOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
  timeZone: "UTC",
} as const

export function decomposeDateTimeToParts(
  value: Date,
  options: Intl.DateTimeFormatOptions = toPartsDateTimeFormatterOptions
): DateTimePartsMapping {
  const toPartsDateTimeFormatter = new Intl.DateTimeFormat("en-US", options)
  const parts = toPartsDateTimeFormatter.formatToParts(value)

  const dateTimeMapping = Object.fromEntries(
    parts.map((part) => {
      return [part.type, part.value]
    })
  ) as DateTimePartsMapping

  return dateTimeMapping
}

export const prettyDateFormatter = d3TimeFormat("%B %d, %Y")
export const prettyDate = (date: Datetime) => {
  // const isDate = date instanceof Date
  const d = parseUtils.isDate(date) ? date : new Date(date)
  const { year, month, day } = decomposeDateTimeToParts(d)
  const utcDate = new Date(Number(year), Number(month) - 1, Number(day))
  return prettyDateFormatter(utcDate)
}
