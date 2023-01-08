import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { trimmer } from "src/common/utils/trimmer";

export class CommentDto{
    @Transform(trimmer)
    @IsNotEmpty()
    @IsString()
    title: string;

    @Transform(trimmer)
    @IsNotEmpty()
    @IsString()
    description: string;


}