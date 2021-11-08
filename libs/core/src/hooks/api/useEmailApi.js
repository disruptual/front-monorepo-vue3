import { computed, reactive, unref } from 'vue';
import { useMutation } from 'vue-query';
import { Email, EmailService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { serializeQueryString } from '@dsp/core/utils/helpers';
import { useModelQuery } from '@dsp/core';

export function useEmailApi() {
  const http = useHttp();
  const emailService = new EmailService({ http });

  return {
    findAllQuery(
      { relations = [], itemsPerPage = 30, filters = {} } = {},
      ...options
    ) {
      const queryKey = computed(
        () => `/mails?${serializeQueryString(unref(filters))}`
      );

      const queryOptions = computed(() => ({
        model: Email,
        itemsPerPage,
        relations,
        ...options
      }));

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
        return emailService.findAll({
          params: { ...pageParam, ...unref(filters) }
        });
      };

      return useCollectionQuery(queryKey, queryFn, queryOptions);
    }
  };
}
