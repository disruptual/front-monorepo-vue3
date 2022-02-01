import { Voucher, VoucherService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useVoucherApi() {
  return useCRUDApi({ model: Voucher, service: VoucherService });
}
