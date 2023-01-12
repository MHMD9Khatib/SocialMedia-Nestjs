import { PROVIDERS } from 'src/common/constants';
import { Comments } from './comment.model';

export const commentProvider = [
  {
    provide: PROVIDERS.COMMENTS_PROVIDER,
    useValue: Comments,
  },
];
