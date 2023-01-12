// TODO: Delete unneeded imports/variables/constants
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Public, Roles, User } from 'src/common/decorators';
import { ROLES } from 'src/common/enums';
import { AuthGuards } from 'src/common/guards';
import { PostType } from 'src/common/types';
import { CommentService } from '../comment/comment.service';
import { CommentDto } from '../comment/dto/comment.dto';
import { SignupDto } from '../user/dto';
import { PostDto } from './dto/post.dto';
import { Posts } from './post.model';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private commentsService: CommentService,
  ) {}

  @Post()
  @Roles(ROLES.CONSULTANT)
  async create(@Body() post, @User() userInfo) {
    return this.postService.createPost(post, userInfo);
  }

  @Post('/:postId/comment')
  @Roles(ROLES.CONSULTANT)
  publishComment(
    @Param('postId', ParseIntPipe) postId: number,
    @User() user: { id: number },
    @Body() Comment: CommentDto,
  ): Promise<CommentDto> {
    return this.postService.createComment(postId, user.id, Comment);
  }

  @Put(':id')
  @Roles(ROLES.CONSULTANT)
  async updatePost(
    @Param('id') id: string,
    @Body() updatedPost: PostDto,
  ): Promise<PostDto> {
    const savedPost = await this.postService.updatePost(id, updatedPost);
    return savedPost;
  }

  @Delete('/:postId')
  @Roles(ROLES.CONSULTANT)
  async deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    // TODO: take user_id from headers
    @Body('userId') user_id: number,
  ) {
    return this.postService.deletePost(postId, user_id);
  }

  // TODO: get timeline

  // TODO: Create pagination
}
