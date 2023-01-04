import { PROVIDERS } from "src/common/constants";
import { Users } from "./user.model";

export const userProvider = [
    {
        provide: PROVIDERS.USERS_PROVIDER,
        useValue: Users,
    },
];