import {
    JwtPayload,
    JwtSignOptions,
    JwtVerifyOptions,
} from '../../entities/types/JwtManager.types';

export interface JwtManagerInterface {
    encode(payload: JwtPayload, options: JwtSignOptions): Promise<string>;
    decode(token: string, options: JwtVerifyOptions): Promise<JwtPayload | undefined>;
}
