import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

import { trimmer } from 'src/common/utils/trimmer';

export class LoginDto {
  @Transform(trimmer)
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
