import {
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

  // Find all questions with pagination and sorting
  async createPost(post: PostDto, userId: number): Promise<PostType> {
    try {
      const newPost = await this.postsRepository.create({
        ...post,
        // createdBy: userId,
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
      console.log('wwwwwwwwwwww', e);
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(postId: number): Promise<Posts> {
    return await this.postsRepository.findOne({
      where: { id: postId },
    });
  }

  async findOneWithComments(
    postId: number,
    userId: number,
  ): Promise<PostType> {
    try {
      const post = await this.postsRepository.findOne({
        where: { id: postId },
      });
      if (!post) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }
      const comments = await this.commentsService.findAll(postId);

      return { post};
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async publishComment(
    postId: number,
    userId: number,
    comment: CommentDto,
  ): Promise<CommentDto> {
    try {
      const ifPost = await this.findOne(postId);
      if (!ifPost) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }
      await this.commentsService.Publish(
        postId,
        userId,
        comment,
      );
      await this.postsRepository.update(
        { isCommented: true },
        { where: { id: postId } },
      );
      console.log(postId, userId, comment);
      return comment;
      
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  


}
