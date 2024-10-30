import { ApiError, ApiErrorCode } from '../../entities/error';
import { validate } from 'class-validator';
import { ClassConstructor, plainToClassInstance } from '../../utilities/plainToInstance';

type ValidateParams<T> = {
    data: T;
    validationClass: ClassConstructor<T>;
};

export class Validator {
    public static async validate<T extends object>(params: ValidateParams<T>): Promise<void> {
        const { data, validationClass } = params;
        const instance = plainToClassInstance(validationClass, data);

        const errors = await validate(instance, {
            validationError: {
                target: false,
            },
        });

        if (errors.length > 0) {
            const details = errors.map((error) => {
                return {
                    property: error.property,
                    message: error.constraints
                        ? (Object.values(error.constraints).join('; ') as string)
                        : 'unknown validation error',
                    value: error.value,
                };
            });

            throw new ApiError(
                ApiErrorCode.BadRequest,
                'validation/failed',
                'failed to validate request',
                details,
            );
        }
    }
}
