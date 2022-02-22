<script>
export default { name: 'ItemFavoriteButton' };
</script>

<script setup>
import { computed } from 'vue';
import { useUserApi, useCurrentUser } from '@dsp/core';
import { Item } from '@dsp/business';
import { useToast } from '@dsp/ui';
import { useI18n } from 'vue-i18n';
import { useQueryClient } from 'vue-query';

const props = defineProps({
  item: { type: Item, required: true }
});

const { t } = useI18n();
const queryClient = useQueryClient();
const { showError } = useToast();

const { data: currentUser, refetch: refetchCurrentUser } = useCurrentUser();
const { mutate: updateUser } = useUserApi().updateMutation({
  onSuccess() {
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

const canFavorite = computed(
  () => !!currentUser.value && props.item._user !== currentUser.value.uri
);

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

const toggleFavorite = () => {
  if (!canFavorite.value) {
    showError('Vous ne pouvez pas ajouter vos propres articles à vos favoris');
    return;
  }

  return isFavorited.value ? removeFromFavorites() : addToFavorites();
};

const favoriteButtonIcon = computed(() =>
  isFavorited.value ? 'heartFilled' : 'heartEmpty'
);

const favoriteButtonTitle = computed(() =>
  isFavorited.value
    ? t('itemCard.removeFromFavorites')
    : t('itemCard.addToFavorites')
);
</script>

<template>
  <dsp-icon-button
    :icon="favoriteButtonIcon"
    :title="favoriteButtonTitle"
    is-plain
    @click="toggleFavorite"
  />
</template>

<style lang="scss" scoped></style>