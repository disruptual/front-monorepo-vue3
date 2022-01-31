import { computed } from 'vue';
import { Review, ReviewService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';
import { useCollectionQuery } from '../useCollectionQuery';

export function useReviewApi() {
  return useCRUDApi(
    {
      model: Review,
      service: ReviewService
    },
    reviewService => ({
      findAllReceivedByUserIdQuery(
        userId,
        { relations = [], requestOptions } = {}
      ) {
        const queryKey = computed(() => `/users/${userId}/reviews_tos`);

        return useCollectionQuery(
          queryKey,
          () => reviewService.findAllByUserId(userId, requestOptions),
          { model: Review, relations }
        );
      }
    })
  );
}
