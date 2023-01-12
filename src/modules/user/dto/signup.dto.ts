import { Transform } from 'class-transformer';
import { trimmer } from 'src/common/utils/trimmer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { ERRORS } from 'src/common/constants/messages';
import { ROLES } from 'src/common/enums';

export class SignupDto {
  @Transform(trimmer)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(trimmer)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Transform(trimmer)
  @IsEnum(ROLES, {
    message: 'Type is not valid',
  })
  role: ROLES;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: ERRORS.PASSWORD_VALIDATION_ERROR,
  })
  password: string;
}
