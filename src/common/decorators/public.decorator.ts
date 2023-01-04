import { SetMetadata } from '@nestjs/common';

import { SYSTEM } from '../constants/index';

export const Public = () => SetMetadata(SYSTEM.PUBLIC, true);
