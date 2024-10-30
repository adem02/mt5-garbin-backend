import { injectable } from 'tsyringe';
import { Body, Controller, Patch, Route, Security, Request, SuccessResponse } from 'tsoa';
import { Request as ExpressRequest } from 'express';
import { UpdateUserPasswordInputDto } from './UpdateUserPassword.dto';
import { UpdateUserPassword } from '../../../../useCases/User/UpdateUserPassword/UpdateUserPassword.useCase';
import { Validator } from '../../../services/Validator.service';

@Route('auth/change-password')
@Security('jwt')
@injectable()
export class UpdateUserPasswordController extends Controller {
    constructor(private readonly useCase: UpdateUserPassword) {
        super();
    }

    @Patch()
    @SuccessResponse('204')
    async updateUserPassword(
        @Body() body: UpdateUserPasswordInputDto,
        @Request() req: ExpressRequest,
    ): Promise<void> {
        const userUuid = req.res?.locals.userUuid as string;

        await Validator.validate({
            data: body,
            validationClass: UpdateUserPasswordInputDto,
        });

        await this.useCase.execute({
            userUuid,
            newPassword: body.password,
        });
    }
}
