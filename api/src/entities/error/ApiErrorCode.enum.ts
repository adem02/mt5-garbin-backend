export enum ApiErrorCode {
    NotFound = 404,
    Unauthorized = 403,
    BadRequest = 400,
    InternalBadRequest = 422,
    TokenExpired = 410,
    TooManyRequests = 429,
    InternalError = 500,
    Forbidden = 401,
}
