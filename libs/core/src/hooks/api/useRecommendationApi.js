import { User, Brand, Category, RecommendationService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { computed } from 'vue';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { useMutation } from 'vue-query';

export function useRecommendationApi(type) {
  const http = useHttp();
  const recommendationService = new RecommendationService({ http });

  return {
    findAllRecommendedUsers({ relations = [] } = {}) {
      const queryKey = computed(() => recommendationService.userEndpoint);

      return useCollectionQuery(
        queryKey,
        () => recommendationService.findAllRecommendedUsers(),
        { model: User, relations }
      );
    },

    recommendedUsersMutation(requestOptions) {
      return useMutation(
        `recommendedUsersMutation`,
        ({ id, position }) => recommendationService.rollback(id, position),
        requestOptions
      );
    },

    findAllRecommendedBrands(brandId, { relations = [] } = {}) {
      const queryKey = computed(() => recommendationService.brandEndpoint);

      return useCollectionQuery(
        queryKey,
        () => recommendationService.findAllRecommendedBrands(brandId),
        { model: User, relations }
      );
    },

    findAllRecommendedCategories(categoryId, { relations = [] } = {}) {
      const queryKey = computed(() => recommendationService.categoryEndpoint);

      return useCollectionQuery(
        queryKey,
        () => recommendationService.findAllRecommendedCategories(categoryId),
        { model: User, relations }
      );
    }
  };
}
