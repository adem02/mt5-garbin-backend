import { LoginUser } from '../../../../useCases/User/LoginUser/LoginUser.useCase';
import { Body, Post, Route, SuccessResponse } from 'tsoa';
import { LoginUserInputDto, LoginUserOutputDto } from './LoginUser.dto';
import { Validator } from '../../../services/Validator.service';
import { injectable } from 'tsyringe';

@Route('auth/login')
@injectable()
export class LoginUserController {
    constructor(private readonly useCase: LoginUser) {}

    @Post()
    @SuccessResponse('200', 'User logged in successfully')
    async login(@Body() body: LoginUserInputDto): Promise<LoginUserOutputDto> {
        await Validator.validate({
            data: body,
            validationClass: LoginUserInputDto,
        });

        const response = await this.useCase.execute(body);

        return new LoginUserOutputDto(response);
    }
}
