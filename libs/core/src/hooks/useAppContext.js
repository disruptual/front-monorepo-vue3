import { useStore } from 'vuex';
import { computed } from 'vue';

export const useAppContext = () => {
  const store = useStore();

  return computed(() => store.getters.appContext);
};
