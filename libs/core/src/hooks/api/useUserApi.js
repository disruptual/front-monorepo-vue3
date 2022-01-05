import { computed } from 'vue';
import { useMutation } from 'vue-query';
import { User, UserService } from '@dsp/business';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';
import { useCRUDApi } from '../useCRUDApi';

export function useUserApi() {
  return useCRUDApi({ model: User, service: UserService }, userService => ({
    findBySlugQuery(slug, { relations = [] } = {}) {
      const queryKey = computed(() => `/users/slug/${slug}`);

      return useModelQuery(queryKey, () => userService.findBySlug(slug), {
        model: User,
        relations
      });
    },

    muteMutation(options) {
      return useMutation(
        `muteUser`,
        userId => userService.mute(userId),
        options
      );
    },

    unmuteMutation(options) {
      return useMutation(
        `unmuteUser`,
        userId => userService.unmute(userId),
        options
      );
    },

    anonymizeMutation(options) {
      return useMutation(
        `anonymizeUser`,
        userId => userService.anonymize(userId),
        options
      );
    },

    creditMutation(options) {
      return useMutation(
        'creditUser',
        formValues => userService.credit(formValues),
        options
      );
    }
  }));
}
