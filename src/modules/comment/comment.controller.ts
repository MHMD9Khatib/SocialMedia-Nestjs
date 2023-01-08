import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from "@nestjs/common";
import { Roles, User } from "src/common/decorators";
import { CommentService } from "./comment.service";
import { CommentDto } from "./dto/comment.dto";

@Controller('comments')
export class CommentController{
    constructor(
        @Inject(CommentService)
        private readonly commentService:CommentService,
    ){}


    
}