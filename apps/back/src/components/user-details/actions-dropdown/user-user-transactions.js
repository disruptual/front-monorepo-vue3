import { computed } from 'vue';
import { useUserApi } from '@dsp/core';
import { useQueryClient } from 'vue-query';

const noop = () => {};
export const useUserTransactions = ({
  user,
  onSuccess = noop,
  onError = noop
}) => {
  const { updateMutation } = useUserApi();

  const queryClient = useQueryClient();
  const isCurrentlyBlocked = computed(
    () => !!user.value.transactionWithdrawBlockedAt
  );

  const { mutate: update } = updateMutation({
    onMutate() {
      queryClient.setQueryData(`/users/slug/${user.value.slug}`, old => ({
        ...old,
        transactionWithdrawBlockedAt: isCurrentlyBlocked.value
          ? null
          : new Date()
      }));
    },
    onSuccess() {
      onSuccess();
    },
    onError(err) {
      onError(err);
    }
  });

  const toggleTransactions = async () => {
    update({
      id: user.value.id,
      entity: {
        transactionWithdrawBlockedAt: isCurrentlyBlocked.value
          ? null
          : new Date()
      }
    });
  };

  return {
    toggleTransactions,
    isCurrentlyBlocked
  };
};
