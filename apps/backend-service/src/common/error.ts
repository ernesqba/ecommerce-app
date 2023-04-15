interface InternalError {
  message: string
  internalCode: string
}
const internalError = (message: string, internalCode: string): InternalError => ({
  message,
  internalCode,
})

export const BAD_REQUEST = 'bad_request'
export const badRequest = (message: string): InternalError => internalError(message, BAD_REQUEST)

export const UNAUTHORIZED_ERROR = 'unauthorized_error'
export const unauthorizedError = (message: string): InternalError => internalError(message, UNAUTHORIZED_ERROR)

export const FORBIDDEN_ERROR = 'forbidden_error'
export const forbiddenError = (message: string): InternalError => internalError(message, FORBIDDEN_ERROR)

export const NOT_FOUND_ERROR = 'not_found_error'
export const notFoundError = (message: string): InternalError => internalError(message, NOT_FOUND_ERROR)

export const DATABASE_ERROR = 'database_error'
export const databaseError = (message: string): InternalError => internalError(message, DATABASE_ERROR)
