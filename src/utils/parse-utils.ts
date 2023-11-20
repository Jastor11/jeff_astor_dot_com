export function stringOrNull(element: any): string | null {
  if (typeof element === "string") {
    return element
  }

  return null
}

export function nonEmptyStringOrNull(element: any): string | null {
  const res = stringOrNull(element)
  return res?.trim() === "" ? null : res
}

export function isDefined<T>(value: T | undefined | null): value is T {
  return typeof value !== "undefined" && value !== null
}

export function ifDefined<T>(value?: T, callback?: (v: T) => T): T | null {
  if (!isDefined(value)) return null

  return isDefined(callback) ? callback(value) : value
}

export const isUndefined = (value: any): value is undefined => {
  return value === undefined
}

export const isNull = (value: any): value is null => {
  return value === null
}

export const isNil = (value: any): value is null | undefined => {
  return isUndefined(value) || isNull(value)
}

export const isPromise = (obj: any | Promise<any>) => {
  return Boolean(obj) && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function"
}

export const isDate = (v: unknown): v is Date => v instanceof Date && typeof v.getMonth === "function"
