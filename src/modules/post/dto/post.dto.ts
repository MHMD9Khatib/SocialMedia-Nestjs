import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { trimmer } from "src/common/utils/trimmer";

export class PostDto{
    @Transform(trimmer)
    @IsNotEmpty()
    @IsString()
    title: string;

    @Transform(trimmer)
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}