import { ref, inject, watch, unref } from 'vue';
import { useRoute } from 'vue-router';
import { CONTEXT_KEYS } from '@/utils/constants';

export const useBreadCrumbs = label => {
  const { fullPath, path } = useRoute();
  const breadcrumbs = inject(CONTEXT_KEYS.BREADCRUMB);
  const hasRegistered = ref(false);

  const register = () => {
    if (hasRegistered.value) return;
    if (unref(label)) {
      breadcrumbs.add({
        label: unref(label),
        target: fullPath,
        path: path
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
        breadcrumbs.setActiveBreadcrumbLabel(newVal);
      }
    }
  );

  return breadcrumbs;
};
