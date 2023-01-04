import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuards, RolesGuard } from './common/guards';
import { CustomLogger } from './common/logger';
import { UserService } from './modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.setGlobalPrefix('api/v1');
  app.useGlobalGuards(
    new AuthGuards(app.get(UserService), new Reflector()),
    new RolesGuard(new Reflector()),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true}));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
