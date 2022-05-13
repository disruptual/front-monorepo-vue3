import { Cart, CartService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useCartApi() {
  return useCRUDApi({ model: Cart, service: CartService });
}
