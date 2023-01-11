import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'config';
import { CommentModule } from './modules/comment/comment.module';
import { DatabaseModule } from './modules/database/database.module';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    CommentModule,
    PostModule,
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
