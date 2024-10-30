import { IsEmail, IsString, MinLength } from 'class-validator';
import { RegisterUserResponse } from '../../../../useCases/User/RegisterUser/RegisterUser.response';
import { RegisterUserRequest } from '../../../../useCases/User/RegisterUser/RegisterUser.request';

export class RegisterUserInputDto implements RegisterUserRequest {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    password!: string;

    @IsString()
    @MinLength(3)
    username!: string;
}

export class RegisterUserOutputDto implements RegisterUserResponse {
    accessToken: string;
    user: {
        uuid: string;
        username: string;
        email: string;
        role: string;
    };

    constructor(response: RegisterUserResponse) {
        this.accessToken = response.accessToken;
        this.user = response.user;
    }
}
