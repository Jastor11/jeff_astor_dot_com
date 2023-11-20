export type Prettify<T> = {
  [K in keyof T]: T[K] // extends string | number | boolean | null | undefined
} & {}

export type Primitive = number | string | boolean | Date
export type AcceptableObjectKey = number | string | symbol
