import { IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordInputDto {
    @IsString()
    @MinLength(6)
    password!: string;
}
