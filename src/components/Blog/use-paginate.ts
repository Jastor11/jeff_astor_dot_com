import * as parseUtils from "@/utils/parse-utils"

/**
 * @interface Options
 */
export type Options = {
  records: number
  page?: number
  limit?: number

  /**
   * @default false
   */
  setRange?: boolean
  /**
   * @default true
   */
  setConstants?: boolean
  max?: number
  min?: number
}

/**
 * @interface Pagination
 */
export type Pagination = {
  records: number
  totalPages: number
  currentPage: number
  firstPage: number
  limit: number
  next: number | null
  previous: number | null
  hasNext: boolean
  hasPrevious: boolean
  isLastPage: boolean
  firstIndex: number
  lastIndex: number
  length: number
  range: number[] | null
}

/**
 * @interface Constants
 */
export type Constants = {
  MIN_LIMIT: number
  MAX_LIMIT: number
}

/**
 * @interface Output
 */
export type Output = {
  offset: number
  pagination: Pagination
  constants: Constants | null
}

/**
 * @constant MIN_ITEMS_PER_PAGE
 */
export const MIN_ITEMS_PER_PAGE = 1

/**
 * @constant MAX_ITEMS_PER_PAGE
 */
export const MAX_ITEMS_PER_PAGE = 100

/**
 * @constant FIRST_PAGE
 */
export const FIRST_PAGE = 1

/**
 * @function lessThanOneOrNaN
 */
export function lessThanOneNaN<T = any>(value: T) {
  const parseInputToNumber = Number(value)

  const isInvalid = parseInputToNumber < 1 || isNaN(parseInputToNumber)

  return { isInvalid, parsedValue: parseInputToNumber }
}

export const lessThan = (value: any) => value < 1 || isNaN(value)

/**
 * @function offsetBased - Offset-based pagination.
 */
export function offsetBased(page: number, limit?: number) {
  let totalPerPage: number

  const limitIsLessThanOneNaN = lessThanOneNaN(limit)

  if (limitIsLessThanOneNaN.isInvalid) {
    totalPerPage = MIN_ITEMS_PER_PAGE
  } else {
    /** number converted  */
    totalPerPage = limitIsLessThanOneNaN.parsedValue
  }

  return ((Number(page) || FIRST_PAGE) - 1) * totalPerPage
}

/**
 * @function calculateRange Calculate range or array of pages
 */
export function calculateRange(start: number, stop?: number, step = 1): number[] {
  const accumulator: number[] = []

  let steps = Number(step)

  const stepIsEqualZeroNaN = steps === 0 || isNaN(steps)

  if (stepIsEqualZeroNaN) return accumulator // []

  // const stopParamIsUndefined = parseUtils.isUndefined(stop);

  const stopValue = parseUtils.isDefined(stop) ? stop : start
  const startValue = parseUtils.isDefined(stop) ? start : 0

  // if (stopParamIsUndefined) {
  //   stop = start;
  //   start = 0;
  // }

  const startIsGreaterThanStop = steps > 0 && start > stopValue

  if (startIsGreaterThanStop) steps *= -1 // [4, 3, 2, 1]

  let interactionsIndex = startValue
  while (steps > 0 ? interactionsIndex <= stopValue : interactionsIndex >= stopValue) {
    accumulator.push(interactionsIndex)

    interactionsIndex += steps
  }

  return accumulator
}

/**
 * @function paginate Main function: "paginate"
 */
export function paginate(options: Options): Output | null {
  const { setConstants = true, min, max, records: total, limit: take, page } = options || {}

  /** Fix constants  */
  const MIN_LIMIT = min || MIN_ITEMS_PER_PAGE

  const MAX_LIMIT = max || MAX_ITEMS_PER_PAGE

  /**
   * - records: `number`
   */
  const records = Number(total)

  const recordsInputIsLessThanZeroNaN = records < 0 || isNaN(records)

  if (recordsInputIsLessThanZeroNaN) return null

  /**
   * @description limit: `number`
   **/
  let limit: number = Number(take)

  const limitLessThanOneNaN = lessThan(limit)

  limit = limitLessThanOneNaN ? MIN_LIMIT : limit

  if (limit > MAX_LIMIT) {
    limit = MAX_LIMIT
  }

  /**
   * - totalPages: `number`
   */
  const totalPages = Math.max(FIRST_PAGE, Math.ceil(records / limit))

  /**
   * @description current: `number`
   */
  let currentPage = Number(page)

  const currentIsLessThanOneNaN = lessThan(currentPage)

  currentPage = currentIsLessThanOneNaN ? FIRST_PAGE : currentPage

  if (currentPage > totalPages) {
    currentPage = totalPages
  }

  /**
   * - next `number`
   * - previous `number`
   */
  const hasNext = currentPage < totalPages

  const hasPrevious = currentPage > FIRST_PAGE

  const isLastPage = currentPage === totalPages

  const next = hasNext ? currentPage + 1 : null

  const previous = hasPrevious ? currentPage - 1 : null

  /**
   * - firstIndex: `number`
   * - lastIndex: `number`
   */
  const firstIndex = offsetBased(currentPage, limit)

  let lastIndex = Math.min(firstIndex + limit - 1, records - 1)

  if (lastIndex < 0) lastIndex = 0

  /**
   * - range: `number[]`
   */
  let range: number[] | null = null

  range = options?.setRange ? calculateRange(FIRST_PAGE, totalPages) : range

  /**
   * - length: `number`
   */
  const length = Math.min(lastIndex - firstIndex + 1, records)

  const constants: Constants | null = setConstants ? { MIN_LIMIT, MAX_LIMIT } : null

  return {
    offset: offsetBased(currentPage, limit),
    pagination: {
      records,
      totalPages,
      currentPage,
      firstPage: FIRST_PAGE,
      limit,
      next,
      previous,
      hasNext,
      hasPrevious,
      isLastPage,
      firstIndex,
      lastIndex,
      range,
      length,
    },
    constants,
  }
}

export function usePaginate(options: Options) {
  return paginate(options)
}
