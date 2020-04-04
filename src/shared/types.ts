interface Right {
  error: Error
}

export const error = (error: Error) => ({
  error
})

export const isError = (arg: unknown): arg is Right =>
  (arg as Right).error !== undefined

export type Either<T, E extends Error> = T | Right
