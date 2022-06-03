import { inject } from 'vue';
import { NOTIFICATION_CONTEXT_KEY } from './notification-constants';

export const useNotification = () => {
  return inject(NOTIFICATION_CONTEXT_KEY);
};
