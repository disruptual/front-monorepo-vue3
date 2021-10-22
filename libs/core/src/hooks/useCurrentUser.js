import { useAuth } from './useAuth';
import { useModelQuery } from './useModelQuery';
import { User } from '@dsp/business';
import { ONE_DAY } from '../utils/constants';

export function useCurrentUser(options) {
  const { authenticate } = useAuth();

  return useModelQuery('currentUser', authenticate, {
    model: User,
    staleTime: ONE_DAY,
    ...options
  });
}
