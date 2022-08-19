import { useToast } from '@dsp/ui';
import { unref } from 'vue';

export const useMutationCallbacks = (
  emit,
  { successEvent, errorEvent, successMessage, errorMessage } = {}
) => {
  const { showError, showSuccess } = useToast();

  return {
    onSuccess(data) {
      if (unref(successMessage)) {
        showSuccess(unref(successMessage));
      }
      if (successEvent) {
        emit(successEvent, data);
      }
    },

    onError(err) {
      console.error(err);
      if (unref(errorMessage)) {
        showError(unref(errorMessage));
      }

      if (errorEvent) {
        emit(errorEvent, err);
      }
    }
  };
};
