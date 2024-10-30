import { Request } from 'express';
import { ApiError, ApiErrorCode } from '../../entities/error';
import { JwtManager } from '../../adapters/gateway/JwtManager';
import { container } from 'tsyringe';
import { ACCESS_AUD, ISSUER } from '../../utilities/constants/jwt.constants';
import { TokenExpiredError } from 'jsonwebtoken';
import { UserRoleEnum } from '../../entities/enum/UserRole.enum';

export const expressAuthentication = async (
    request: Request,
    securityName: string,
    scopes?: UserRoleEnum[],
): Promise<any> => {
    if (securityName === 'jwt') {
        const token = request.headers['authorization'];

        if (!token || !token.startsWith('Bearer ')) {
            throw new ApiError(
                ApiErrorCode.Unauthorized,
                'auth/missing-header',
                'Missing or incorrect authorization header',
            );
        }

        const jwtToken = token.split(' ')[1];

        const jwtManager = container.resolve(JwtManager);

        return new Promise((resolve, reject) => {
            jwtManager
                .decode(jwtToken, {
                    issuer: ISSUER,
                    audience: ACCESS_AUD,
                })
                .then((decoded) => {
                    if (!decoded || !decoded.userUuid) {
                        throw new ApiError(
                            ApiErrorCode.Unauthorized,
                            'auth/invalid-access-token',
                            'Invalid token',
                        );
                    }

                    if (scopes) {
                        if (scopes.some((scope) => !Object.values(UserRoleEnum).includes(scope))) {
                            throw new ApiError(
                                ApiErrorCode.Forbidden,
                                'auth/invalid-role',
                                'Invalid role',
                            );
                        }

                        const scopedRoles = scopes.map((scope) => scope.toString().toLowerCase());

                        if (scopedRoles.length > 0) {
                            const role = decoded.role;

                            if (!scopedRoles.includes(role)) {
                                throw new ApiError(
                                    ApiErrorCode.Forbidden,
                                    'auth/insufficient-role',
                                    'Insufficient role',
                                );
                            }
                        }
                    }

                    request.res!.locals = {
                        userUuid: decoded.userUuid,
                    };

                    resolve(decoded);
                })
                .catch((err) => {
                    if (err instanceof TokenExpiredError) {
                        reject(
                            new ApiError(
                                ApiErrorCode.Unauthorized,
                                'auth/access-token-expired',
                                'Token expired',
                            ),
                        );
                    } else {
                        reject(err);
                    }
                });
        });
    }

    throw new ApiError(
        ApiErrorCode.Unauthorized,
        'auth/invalid-security-name',
        'Invalid security name',
    );
};
