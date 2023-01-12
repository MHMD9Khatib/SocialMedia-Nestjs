// TODO: Delete unneeded imports/variables/constants

import {
  Body,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
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
  async createPost(post, userInfo): Promise<PostType> {
    try {
      // TODO: remove console logs
      console.log(111111, post, userInfo.get({ plain: true }));

      const newPost = await this.postsRepository.create({
        ...post,
        userId: userInfo.id,
      });
      // TODO: remove console logs
      console.log(22222, newPost);

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
    const originalPost = await this.postsRepository.findOne({
      where: { id },
    });

    if (!originalPost) {
      throw new HttpException('post Not Found', HttpStatus.BAD_REQUEST);
    }
    originalPost.title = updatedPost.title;
    originalPost.description = updatedPost.description;
    return originalPost.save();
  }

  async deletePost(postId: number, @Body('user_id') user_id: number) {
    // think of a better logic
    if (postId <= 0) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    // const userCreator =
    if (!post) {
      throw new HttpException('post Not Found', HttpStatus.BAD_REQUEST);
    }
    if (post.userId !== user_id) {
      throw new HttpException(
        "You don't have permission to delete this post",
        HttpStatus.FORBIDDEN,
      );
    }
    // TODO: Delete comments as well
    await this.postsRepository.destroy({ where: { id: postId } });
    // TODO: Delete requests do not return anything
    return { message: 'post Deleted Successfully' };
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
  }
}
