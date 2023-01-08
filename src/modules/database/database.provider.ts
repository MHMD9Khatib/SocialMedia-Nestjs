import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { CONFIG, PROVIDERS } from "src/common/constants";
import { Comments } from "../comment/comment.model";
import { Posts } from "../post/post.model";
import { Users } from "../user/user.model";

export const databaseProviders = [
    {
        provide: PROVIDERS.DATABASE_PROVIDER,
        useFactory: (configService: ConfigService) => {
          const sequelize = new Sequelize({
            ...configService.get(CONFIG.DATABASE),
          });
          sequelize.addModels([Users, Posts, Comments]);
          return sequelize;
        },
        inject: [ConfigService],
      },
    ];