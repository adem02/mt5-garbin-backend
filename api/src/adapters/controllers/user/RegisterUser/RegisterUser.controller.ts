import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa';
import { RegisterUser } from '../../../../useCases/User/RegisterUser/RegisterUser.useCase';
import { RegisterUserInputDto, RegisterUserOutputDto } from './RegisterUser.dto';
import { injectable } from 'tsyringe';
import { Validator } from '../../../services/Validator.service';

@Route('auth/register')
@injectable()
export class RegisterUserController extends Controller {
    constructor(private readonly useCase: RegisterUser) {
        super();
    }

    @Post()
    @SuccessResponse('201', 'User registered successfully')
    async registerUser(@Body() body: RegisterUserInputDto): Promise<RegisterUserOutputDto> {
        await Validator.validate({
            data: body,
            validationClass: RegisterUserInputDto,
        });

        const response = await this.useCase.execute(body);

        return new RegisterUserOutputDto(response);
    }
}
