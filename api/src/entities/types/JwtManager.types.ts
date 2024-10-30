export interface JwtPayload {
    userUuid: string;
    role: string;
}

export interface JwtSignOptions {
    expiresIn: string;
    issuer: string;
    audience: string;
}

export interface JwtVerifyOptions {
    issuer: string;
    audience: string;
}
