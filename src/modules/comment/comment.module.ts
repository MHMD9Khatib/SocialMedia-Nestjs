import { forwardRef, Module } from '@nestjs/common';
import { PostModule } from '../post/post.module';
import { CommentController } from './comment.controller';
import { commentProvider } from './comment.provider';
import { CommentService } from './comment.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports : [forwardRef(() => PostModule),PassportModule],
  controllers: [CommentController],
providers: [...commentProvider, CommentService],
exports: [CommentService],
})
export class CommentModule {}