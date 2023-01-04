import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'config';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
})

// mysql -u root -p
export class AppModule {}
