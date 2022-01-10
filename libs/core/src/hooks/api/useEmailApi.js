
import { Email, EmailService } from '@dsp/business';

import { useCRUDApi } from '../useCRUDApi';


export function useEmailApi() {

  return useCRUDApi({
    model: Email,
    service: EmailService
  });
}
