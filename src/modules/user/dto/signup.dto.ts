import { Transform } from "class-transformer";
import { trimmer } from "src/common/utils/trimmer";
import { IsEmail, IsNotEmpty ,IsString , Matches} from 'class-validator';
import { ERRORS } from "src/common/constants/messages";

export class SignupDto {
    @Transform(trimmer)
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Transform(trimmer)
    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
      message: ERRORS.PASSWORD_VALIDATION_ERROR,
    })
    password: string;

}