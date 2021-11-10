import { computed, reactive, unref } from 'vue';
import { useMutation } from 'vue-query';
import { Contact, ContactService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { serializeQueryString } from '@dsp/core/utils/helpers';
import { useModelQuery } from '@dsp/core';

export function useContactApi() {
  const http = useHttp();
  const contactService = new ContactService({ http });
  const defaultFilters = {
    'sort[created]': 'desc',
    'root[exists]': false
  };

  return {
    findAllQuery(
      { relations = [], itemsPerPage = 30, filters = {} } = {},
      ...options
    ) {
      const mergedFilters = computed(() => ({
        ...defaultFilters,
        ...unref(filters)
      }));

      const queryKey = computed(
        () => `/contacts?${serializeQueryString(mergedFilters.value)}`
      );

      const queryOptions = computed(() => ({
        model: Contact,
        itemsPerPage,
        relations,
        ...options
      }));

      const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
        return contactService.findAll({
          params: { ...pageParam, ...unref(mergedFilters) }
        });
      };

      return useCollectionQuery(queryKey, queryFn, queryOptions);
    },

    findContactByIdQuery(id, { relations = [] } = {}) {
      const queryKey = computed(() => `/contacts/${id}`);

      return useModelQuery(queryKey, () => contactService.findById(id), {
        model: Contact,
        relations
      });
    },

    createMutation() {
      return useMutation('createContact', dto =>
        contactService.create(unref(dto))
      );
    }
  };
}
