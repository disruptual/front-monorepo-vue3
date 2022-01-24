import { computed } from 'vue';
import { useUserApi, useCurrentUser } from '@dsp/core';
import { useToast } from '@dsp/ui';
import { useI18n } from 'vue-i18n';
import { useQueryClient } from 'vue-query';

export const useItemCard = props => {
  const { t } = useI18n();
  const queryClient = useQueryClient();
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
    },

    onMutate: async ({ id, entity }) => {
      queryClient.setQueryData('currentUser', old => ({
        ...old,
        favoritesItems: entity.favoritesItems
      }));

      return { id, entity };
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

  const favoriteButtonTitle = computed(() =>
    isFavorited.value
      ? t('itemCard.removeFromFavorites')
      : t('itemCard.addToFavorites')
  );

  const imageUrl = computed(() => {
    const { item } = props;
    const media = item.medias.find(m => m['@id'] === item._mainMedia);

    return media?.thumbnails?.item;
  });

  return {
    toggleFavorite,
    favoriteButtonIcon,
    favoriteButtonTitle,
    canFavorite,
    imageUrl
  };
};
