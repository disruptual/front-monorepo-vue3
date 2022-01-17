import { computed } from 'vue';
import { useUserApi, useCurrentUser } from '@dsp/core';
import { useToast } from '@dsp/ui';

export const useItemCard = props => {
  const { showSuccess, showError } = useToast();
  const { data: currentUser, refetch: refetchCurrentUser } = useCurrentUser();
  const { mutate: updateUser } = useUserApi().updateMutation({
    onSuccess() {
      showSuccess('Succes !');
      refetchCurrentUser.value();
    },

    onError(err) {
      console.error(err);
      showError('Error !');
    }
  });

  const isFavorited = computed(() => {
    if (!currentUser.value) return false;
    return currentUser.value.favoritesItems.includes(props.item.uri);
  });

  const addToFavorites = () => {
    updateUser({
      id: currentUser.value.id,
      entity: {
        favoritesItems: [...currentUser.value.favoritesItems, props.item.uri]
      }
    });
  };

  const removeFromFavorites = () => {
    updateUser({
      id: currentUser.value.id,
      entity: {
        favoritesItems: currentUser.value.favoritesItems.filter(
          uri => props.item.uri !== uri
        )
      }
    });
  };

  const toggleFavorite = () =>
    isFavorited.value ? removeFromFavorites() : addToFavorites();

  const favoriteButtonIcon = computed(() =>
    isFavorited.value ? 'heartFilled' : 'heartEmpty'
  );

  const canFavorite = computed(
    () => !!currentUser.value && props.item._user !== currentUser.value.uri
  );

  return { toggleFavorite, favoriteButtonIcon, canFavorite };
};
