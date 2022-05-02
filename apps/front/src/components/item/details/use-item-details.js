import { inject } from 'vue';
import { ITEM_DETAILS_CONTEXT_KEY } from './item-details-constants';

export const useItemDetails = () => {
  return inject(ITEM_DETAILS_CONTEXT_KEY);
};
