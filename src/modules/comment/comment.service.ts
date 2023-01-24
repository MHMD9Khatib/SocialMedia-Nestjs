import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ERRORS, PROVIDERS } from 'src/common/constants';
import { PostService } from '../post/post.service';
import { Comments } from './comment.model';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @Inject(PROVIDERS.COMMENTS_PROVIDER)
    private readonly commentsRepository: typeof Comments,
    @Inject(forwardRef(() => PostService))
    private postService: PostService,
  ) {}

  async findAll(postId: number): Promise<Comments[]> {
    const comments = await this.commentsRepository.findAll({
      where: { postId },
      order: [['createdAt', 'DESC']],
    });
    return comments;
  }

  async publish(
    postId: number,
    userData: any,
    comment: CommentDto,
  ): Promise<void> {
    await this.commentsRepository.create({
      ...comment,
      postId,
      userId: userData.id,
    });
  }

  async createComment(
    postId: number,
    userData: any,
    comment: CommentDto,
  ): Promise<CommentDto> {
    try {
      const ifPost = await this.postService.findOne(postId);
      if (!ifPost) {
        throw new HttpException(ERRORS.POST_NOT_FOUND, 404);
      }
      await this.publish(postId, userData, comment);

      return comment;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getCommentsForPost(id: number) {
    const post = await this.postService.findOne(id);
    if (!post) {
      return 'post not found';
    }
    const comments = await this.findAll(id);

    return {
      post,
      comments,
    };
  }
}
