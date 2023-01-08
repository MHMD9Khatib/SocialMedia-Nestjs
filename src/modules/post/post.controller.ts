import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public, Roles, User } from 'src/common/decorators';
import { ROLES } from 'src/common/enums';
import { PostType } from 'src/common/types';
import { CommentService } from '../comment/comment.service';
import { CommentDto } from '../comment/dto/comment.dto';
import { SignupDto } from '../user/dto';
import { PostDto } from './dto/post.dto';
import { Posts } from './post.model';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService,
    private commentsService: CommentService,
    ) {}

  @Public()
  @Post()
  async create(@Body() post: PostDto, userId: number) {
    return this.postService.createPost(post, userId);
  }

  @Get()
  findAll(): Promise<Posts[]> {
    return this.findAll();
  }


  @Get(':postId')
  findOne(
    @Param('postId', ParseIntPipe) postId: number,
    @User() user: { id: number },
  ): Promise<PostType> {
    return this.postService.findOneWithComments(postId, user.id);
  }

  @Post('/:postId/comment')
  publishComment(
    @Param('postId', ParseIntPipe) postId: number,
    @User() user: { id: number },
    @Body() Comment: CommentDto,
  ): Promise<CommentDto> {
    return this.postService.publishComment(
      postId,
      user.id,
      Comment,
    );
  }

}

