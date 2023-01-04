import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { CONFIG, PROVIDERS } from "src/common/constants";
import { Users } from "../user/user.model";

export const databaseProviders = [
    {
        provide: PROVIDERS.DATABASE_PROVIDER,
        useFactory: (configService: ConfigService) => {
          const sequelize = new Sequelize({
            ...configService.get(CONFIG.DATABASE),
          });
          sequelize.addModels([Users]);
          return sequelize;
        },
        inject: [ConfigService],
      },
    ];