import { computed, unref } from 'vue';
import { useMutation } from 'vue-query';
import { deepUnref } from '../../utils';
import { User, UserService } from '@dsp/business';
import { useModelQuery } from '@dsp/core/hooks/useModelQuery';
import { useCRUDApi } from '../useCRUDApi';

export function useUserApi() {
  return useCRUDApi({ model: User, service: UserService }, userService => ({
    findBySlugQuery(slug, options) {
      const queryKey = computed(() => `/users/slug/${unref(slug)}`);

      const queryOptions = computed(() => ({
        model: User,
        ...deepUnref(options)
      }));

      return useModelQuery(
        queryKey,
        () => userService.findBySlug(unref(slug)),
        queryOptions
      );
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

    blockedMutation(options) {
      return useMutation(
        `blockedUser`,
        userId => userService.blocked(userId),
        options
      );
    },

    unblockedMutation(options) {
      return useMutation(
        `unblockedUser`,
        userId => userService.unblocked(userId),
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
