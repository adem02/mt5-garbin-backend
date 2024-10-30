export interface LoginUserResponse {
    user: {
        uuid: string;
        username: string;
        email: string;
        role: string;
    };
    accessToken: string;
}
