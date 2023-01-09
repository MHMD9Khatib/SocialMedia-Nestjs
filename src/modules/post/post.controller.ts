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

  @Public()
  @Post()
  async create(@Body() post: PostDto, userId: number) {
    return this.postService.createPost(post, userId);
  }

  @Post('/:postId/comment')
  publishComment(
    @Param('postId', ParseIntPipe) postId: number,
    @User() user: { id: number },
    @Body() Comment: CommentDto,
  ): Promise<CommentDto> {
    return this.postService.createComment(postId, user.id, Comment);
  }

  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatedPost: PostDto,
  ): Promise<PostDto> {
    try {
      const savedPost = await this.postService.updatePost(id, updatedPost);
      return savedPost;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:postId')
  async deletePost(
    @Param('postId', ParseIntPipe) postId: number,
    @Body('userId') user_id: number,
  ) {
    try {
      return this.postService.deletePost(postId, user_id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
