import { Contact, ContactService } from '@dsp/business';
import { useCRUDApi } from '../useCRUDApi';

export function useContactApi() {
  return useCRUDApi({
    model: Contact,
    service: ContactService
  });
}
