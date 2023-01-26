import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ERRORS, PROVIDERS } from 'src/common/constants';
import { User } from 'src/common/decorators';
import { Comments } from '../comment/comment.model';
import { CommentService } from '../comment/comment.service';
import { PostDto } from './dto/post.dto';
import { Posts } from './post.model';

@Injectable()
export class PostService {
  constructor(
    @Inject(PROVIDERS.POSTS_PROVIDER)
    private readonly postsRepository: typeof Posts,
    @Inject(forwardRef(() => CommentService))
    private commentsService: CommentService,
  ) {}

  async getTimeline(
    pageNr: number,
    offset: number,
    limit: number,
    withComments: boolean,
  ): Promise<{ posts: Posts[], comments: Comments[] }> {
    const posts = await this.postsRepository.scope('basic').findAll({
      limit,
      offset: pageNr * offset,
    });

    if (withComments) {
      const comments = (
        await Promise.all(
          posts.map((post, i) => this.commentsService.findAll(post.id)),
        )
      ).flat();
      return {
        posts,
        comments,
      };
    } else {
      return { posts,comments : [] };


    }
  }
  // : posts.map((post, i) => ({ ...post, comments: comments[i] }))
  // Create new post
  async createPost(post: PostDto, userData: any) {
    const newPost = await this.postsRepository.create({
      ...post,
      userId: userData.id,
    });
    

    return {
      post: {
        id: newPost.id,
        userId: newPost.userId,
        title: newPost.title,
        description: newPost.description,
      },
    };
  }

  async updatePost(id: number, updatedPost: PostDto, @User() userData: any) {
    if (id <= 0) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    try {
      const originalPost = await this.postsRepository.findOne({
        where: { id },
      });
      if (!originalPost) {
        throw new HttpException('post Not Found', HttpStatus.BAD_REQUEST);
      }
      if (originalPost.userId !== userData.id) {
        throw new HttpException(
          "You don't have permission to delete this post",
          HttpStatus.FORBIDDEN,
        );
      }
      originalPost.title = updatedPost.title;
      originalPost.description = updatedPost.description;
      const savedPost = await originalPost.save();
      return savedPost;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId: number, @User() userData: any) {
    if (postId <= 0) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    if (!post) {
      throw new HttpException('post Not Found', HttpStatus.BAD_REQUEST);
    }
    if (post.userId !== userData) {
      throw new HttpException(
        "You don't have permission to delete this post",
        HttpStatus.FORBIDDEN,
      );
    }
    await this.postsRepository.destroy({ where: { id: postId } });

    return null;
  }

  async findOne(postId: number): Promise<Posts> {
    return await this.postsRepository.findOne({
      where: { id: postId },
    });
  }

  async getCommentsForPost(id: number) {
    const post = await this.findOne(id);
    if (!post) {
      throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
    }
    const comments = await this.commentsService.findAll(id);

    return {
      post,
      comments,
    };
  }
}
