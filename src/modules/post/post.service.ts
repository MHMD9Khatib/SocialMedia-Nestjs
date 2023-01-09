import {
  Body,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ERRORS, PROVIDERS } from 'src/common/constants';
import { PostType } from 'src/common/types';
import { CommentService } from '../comment/comment.service';
import { CommentDto } from '../comment/dto/comment.dto';
import { SignupDto } from '../user/dto';
import { PostDto } from './dto/post.dto';
import { Posts } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @Inject(PROVIDERS.POSTS_PROVIDER)
    private readonly postsRepository: typeof Posts,
    private commentsService: CommentService,
  ) {}

  // Create new post
  async createPost(post: PostDto, userId: number): Promise<PostType> {
    try {
      const newPost = await this.postsRepository.create({
        ...post,
      });

      return {
        post: {
          id: newPost.id,
          userId: newPost.userId,
          title: newPost.title,
          description: newPost.description,
        },
      };
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async updatePost(id: string, updatedPost: PostDto): Promise<PostDto> {
    try {
      const originalPost = await this.postsRepository.findOne({
        where: { id },
      });
      originalPost.title = updatedPost.title;
      originalPost.description = updatedPost.description;
      const savedPost = await originalPost.save();
      return savedPost;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId: number, @Body('user_id') user_id: number) {
    try {
      if (postId > 0) {
        const post = await this.postsRepository.findOne({
          where: { id: postId },
        });
        if (!post) {
          throw new HttpException('post Not Found', HttpStatus.BAD_REQUEST);
        }
        if (post.userId !== user_id) {
          throw new HttpException(
            "You don't have permission to delete this post",
            HttpStatus.FORBIDDEN,
          );
        }
        // await this.postsRepository.delete(postId);
        return { message: 'post Deleted Successfully' };
      }
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findOne(postId: number): Promise<Posts> {
    return await this.postsRepository.findOne({
      where: { id: postId },
    });
  }

  // create comment
  async createComment(
    postId: number,
    userId: number,
    comment: CommentDto,
  ): Promise<CommentDto> {
    try {
      const ifPost = await this.findOne(postId);
      if (!ifPost) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }
      await this.commentsService.Publish(postId, userId, comment);
      await this.postsRepository.update(
        { isCommented: true },
        { where: { id: postId } },
      );
      return comment;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
