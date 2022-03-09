import { RecommendedUser, RecommendedUserService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useRecommendedUserApi() {
  return useCRUDApi({
    model: RecommendedUser,
    service: RecommendedUserService
  });
}
