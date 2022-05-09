import { computed, unref } from 'vue';
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
      findAllReceivedByUserIdQuery(userId, options = {}) {
        const queryKey = computed(() => `/users/${unref(userId)}/reviews_tos`);

        const queryOptions = computed(() => {
          const { relations = [], ...rest } = unref(options);
          return {
            model: Review,
            relations,
            ...rest
          };
        });
        return useCollectionQuery(
          queryKey,
          () => reviewService.findAllByUserId(unref(userId), options),
          queryOptions
        );
      }
    })
  );
}
