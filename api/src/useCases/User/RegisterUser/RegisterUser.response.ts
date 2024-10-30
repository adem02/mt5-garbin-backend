export interface RegisterUserResponse {
    user: {
        uuid: string;
        username: string;
        email: string;
        role: string;
    };
    accessToken: string;
}
