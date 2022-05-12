import { CartItem, CartItemService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useCartItemApi() {
  return useCRUDApi({ model: CartItem, service: CartItemService });
}
