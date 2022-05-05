import { inject } from 'vue';
import { USER_PROFILE_CONTEXT_KEY } from './user-profile-constants';

export const useUserProfile = () => {
  return inject(USER_PROFILE_CONTEXT_KEY);
};
