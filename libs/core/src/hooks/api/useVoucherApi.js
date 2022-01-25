import { computed, unref } from 'vue';
import { Voucher, VoucherService } from '@dsp/business';
import { useHttp } from '@dsp/core/hooks/useHttp';
import { useCollectionQuery } from '@dsp/core/hooks/useCollectionQuery';
import { serializeQueryString } from '@dsp/core/utils/helpers';
import { useMutation } from 'vue-query';
import { useCRUDApi } from '../useCRUDApi';

export function useVoucherApi() {
  const http = useHttp();
  const voucherService = new VoucherService({ http });
  const defaultFilters = {
    'createdAt[after]': undefined,
    'createdAt[before]': undefined,
    'sort[createdDate]': 'desc'
  };

  return useCRUDApi(
    { model: Voucher, service: VoucherService },
    voucherService => ({
      findAllQuery(
        { relations = [], itemsPerPage = 30, filters = {} } = {},
        ...options
      ) {
        const mergedFilters = computed(() => ({
          ...defaultFilters,
          ...unref(filters)
        }));

        const queryKey = computed(
          () => `/vouchers?${serializeQueryString(mergedFilters.value)}`
        );

        const queryOptions = computed(() => ({
          model: Voucher,
          itemsPerPage,
          relations,
          ...options
        }));

        const queryFn = ({ pageParam = { page: 1, itemsPerPage } }) => {
          return voucherService.findAll({
            params: { ...pageParam, ...unref(mergedFilters) }
          });
        };

        return useCollectionQuery(queryKey, queryFn, queryOptions);
      },
      updateMutation() {
        return useMutation('updateStore', ({ id, dto }) => {
          voucherService.update(id, dto);
        });
      }
    })
  );
}
