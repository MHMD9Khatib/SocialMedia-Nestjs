import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles, User } from 'src/common/decorators';
import { ROLES } from 'src/common/enums';
import { CommentService } from '../comment/comment.service';
import { CommentDto } from '../comment/dto/comment.dto';
import { PostDto } from './dto/post.dto';
import { Posts } from './post.model';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Get()
  async getTimeline(
    @Query('pageNr') pageNr?: number,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<Posts[]> {
    return await this.postService.getTimeline(
      pageNr || 1,
      offset || 10,
      limit || 10,
    );
  }

  @Post()
  async createPost(@Body() post: PostDto, @User('id') userData: any) {
    return await this.postService.createPost(post, userData);
  }

  @Put(':id')
  async updatePost(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatedPost: PostDto,
    @User('id') userData: any,
  ) {
    return await this.postService.updatePost(id, updatedPost, userData);
  }

  @Delete(':id')
  async deletePost(
    @Param('id', new ParseIntPipe()) postId: number,
    @User('id') userData: any,
  ) {
    return await this.postService.deletePost(postId, userData.id);
  }
}
