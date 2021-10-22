import { ref, inject, watch, unref } from 'vue';
import { useRoute } from 'vue-router';
import { CONTEXT_KEYS } from '@/utils/constants';

export const useBreadCrumbs = label => {
  const { fullPath } = useRoute();
  const [breadcrumbs, actions] = inject(CONTEXT_KEYS.BREADCRUMB);
  const hasRegistered = ref(false);

  const register = () => {
    if (hasRegistered.value) return;
    if (unref(label)) {
      actions.add({
        label: unref(label),
        target: fullPath
      });
      hasRegistered.value = true;
    }
  };

  register();

  watch(
    () => unref(label),
    (newVal, oldVal) => {
      if (!oldVal) {
        register();
      } else {
        actions.setActiveBreadcrumbLabel(newVal);
      }
    }
  );

  return [breadcrumbs, { ...actions }];
};
