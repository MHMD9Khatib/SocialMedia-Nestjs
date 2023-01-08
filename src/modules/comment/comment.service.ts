import { Inject, Injectable } from "@nestjs/common";
import { PROVIDERS, SYSTEM } from "src/common/constants";
import { PostDto } from "../post/dto/post.dto";
import { Comments } from "./comment.model";
import { CommentDto } from "./dto/comment.dto";

@Injectable()
export class CommentService {
  constructor(
    @Inject(PROVIDERS.COMMENTS_PROVIDER)
    private readonly commentsRepository: typeof Comments,
  ) {}
    
  async findAll(postId: number): Promise<Comments[]> {
    const answers = await this.commentsRepository.findAll({
      where: { postId},
      order: [['createdAt', 'DESC']],
    });
    return answers;
  }

  

  async Publish(
    postId: number,
    userId: number,
    comment: CommentDto,
  ): Promise<void> {
    await this.commentsRepository.create(
      {
        ...comment,
        updatedBy: userId,
      }
    );
  }
}