import { Posts } from './post.model';

import { PROVIDERS } from 'src/common/constants';

export const postProvider = [
  {
    provide: PROVIDERS.POSTS_PROVIDER,
    useValue: Posts,
  },
];
