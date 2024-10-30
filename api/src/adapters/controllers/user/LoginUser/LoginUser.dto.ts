import { IsString } from 'class-validator';
import { LoginUserRequest } from '../../../../useCases/User/LoginUser/LoginUser.request';
import { LoginUserResponse } from '../../../../useCases/User/LoginUser/LoginUser.response';

export class LoginUserInputDto implements LoginUserRequest {
    @IsString()
    email!: string;

    @IsString()
    password!: string;
}

export class LoginUserOutputDto implements LoginUserResponse {
    accessToken: string;
    user: {
        uuid: string;
        username: string;
        email: string;
        role: string;
    };

    constructor(response: LoginUserResponse) {
        this.accessToken = response.accessToken;
        this.user = response.user;
    }
}
