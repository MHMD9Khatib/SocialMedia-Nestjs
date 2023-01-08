import { Module } from '@nestjs/common';
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
// …or push an existing repository from the command line
// git remote add origin https://github.com/MHMD9Khatib/SocialMedia-Nestjs.git
// git branch -M main
// git push -u origin main
// mysql -u root -p
export class AppModule {}
