import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { JwtPayload } from '../../entities/types/JwtManager.types';
import { JwtManagerInterface } from '../../useCases/gateway/JwtManager.interface';
import { join } from 'path';
import { inject, injectable } from 'tsyringe';
import { Logger } from '../../utilities/constants';
import { LoggerInterface } from '../../entities/logger/Logger.interface';

@injectable()
export class JwtManager implements JwtManagerInterface {
    public static PRIVATE_KEY: string;
    public static PUBLIC_KEY: string;

    constructor(@inject(Logger) private readonly logger: LoggerInterface) {
        if (!JwtManager.PRIVATE_KEY) {
            const privateKeyPath = join('secrets', 'signing', 'signing.key');

            JwtManager.PRIVATE_KEY = readFileSync(privateKeyPath, 'ascii');
        }

        if (!JwtManager.PUBLIC_KEY) {
            const publicKeyPath =
                process.env.PUBLIC_KEY_FILE || join('secrets', 'signing', 'signing.pub');

            console.log('JwtManger -> publicKeyPath', publicKeyPath);
            JwtManager.PUBLIC_KEY = readFileSync(publicKeyPath, 'ascii');
            // JwtManager.PUBLIC_KEY = readFileSync(process.env.PUBLIC_KEY_FILE || join('secrets', 'signing', 'signing.pub'), 'ascii')
        }
    }

    async encode(payload: JwtPayload, options: jwt.SignOptions): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                JwtManager.PRIVATE_KEY,
                {
                    algorithm: 'RS256',
                    expiresIn: options.expiresIn,
                    issuer: options.issuer,
                    audience: options.audience,
                },
                (err, encoded) => {
                    if (err || !encoded) {
                        this.logger.error('Error encoding JWT token', [err]);
                        reject(err);
                    } else {
                        resolve(encoded);
                    }
                },
            );
        });
    }

    decode(token: string, options: jwt.VerifyOptions): Promise<JwtPayload | undefined> {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                JwtManager.PUBLIC_KEY,
                {
                    algorithms: ['RS256'],
                    issuer: options.issuer,
                    audience: options.audience,
                },
                (err, decoded) => {
                    if (err) {
                        this.logger.error('Error decoding JWT token', [err]);
                        reject(err);
                    } else {
                        resolve(decoded as JwtPayload);
                    }
                },
            );
        });
    }
}
