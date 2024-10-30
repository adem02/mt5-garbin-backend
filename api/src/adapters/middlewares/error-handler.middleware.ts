import { NextFunction, Request, Response } from 'express';
import { ApiError, ApiErrorCode } from '../../entities/error';
import { LoggerService } from '../services/Logger.service';
import { ValidateError } from 'tsoa';

export const ErrorHandlerMiddleware = (
    error: any,
    _: Request,
    res: Response,
    __: NextFunction,
): void => {
    const logger = new LoggerService();

    let err = new ApiError(
        ApiErrorCode.InternalError,
        'internal/unknown',
        'An unknown error occurred',
        error,
    );

    if (error) {
        if (error instanceof ApiError) {
            err = error;
        } else if (error.sql) {
            err = new ApiError(ApiErrorCode.BadRequest, 'sql/failed', error.message, {
                sqlState: error.sqlState,
                sqlCode: error.code,
            });
        } else if (error instanceof ValidateError) {
            const details = [];
            for (const [key, value] of Object.entries(error.fields)) {
                details.push({
                    property: key.split('.')[1],
                    message: value.message || 'unknown validation error',
                    value: value.value,
                });
            }
            err = new ApiError(
                ApiErrorCode.InternalBadRequest,
                'validation/failed',
                'failed to validate request',
                details,
            );
            error.message = 'failed to validate request.';
        } else {
            if (error.message) {
                err.errMessage = error.message;
            }
        }
    }

    logger.error(error.message, [err.json]);

    res.status(err.httpCode).json(err.json);
};
