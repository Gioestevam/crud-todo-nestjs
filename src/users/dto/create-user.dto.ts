import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { RegexHelper } from "../../helpers/regex.helper";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(RegexHelper.passwordRegex)
    password: string;
}