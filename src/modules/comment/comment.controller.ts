import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Roles, User } from 'src/common/decorators';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(
    @Inject(CommentService)
    private readonly commentService: CommentService,
  ) {}
  @Post(':postId/comment')
  async createComment(
    @Param('postId') postId: number,
    @User('id') userData: any,
    @Body() comment: CommentDto,
  ) {
    return await this.commentService.createComment(+postId, userData, comment);
  }


}
