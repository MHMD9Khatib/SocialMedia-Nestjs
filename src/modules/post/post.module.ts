import { forwardRef, Module } from "@nestjs/common";
import { CommentModule } from "../comment/comment.module";
import { PostController } from "./post.controller";
import { postProvider } from "./post.provider";
import { PostService } from "./post.service";
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [ forwardRef(() => CommentModule),PassportModule],
  controllers: [PostController],
  providers: [PostService, ...postProvider],
  exports: [PostService],
})
export class PostModule {}
