import { ApiErrorCode } from './ApiErrorCode.enum';
import { ApiErrorKey } from './ApiErrorKey.type';
import { ApiErrorInterface } from './ApiError.interface';

export class ApiError extends Error {
    constructor(
        public httpCode: ApiErrorCode,
        public errorKey: ApiErrorKey,
        public errMessage: string,
        public errDetails?: any,
    ) {
        super(errMessage);
    }

    get json(): ApiErrorInterface {
        return {
            code: this.httpCode,
            key: this.errorKey,
            message: this.errMessage,
            details: this.errDetails,
        };
    }
}
