import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { trimmer } from "src/common/utils/trimmer";

export class PostDto{
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    
    @Transform(trimmer)
    @IsNotEmpty()
    @IsString()
    title: string;

    @Transform(trimmer)
    @IsNotEmpty()
    @IsString()
    description: string;


}