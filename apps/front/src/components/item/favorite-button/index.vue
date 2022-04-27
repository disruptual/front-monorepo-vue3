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

const newFavorites = computed(() =>
  isFavorited.value
    ? currentUser.value.favoritesItems.filter(uri => props.item.uri !== uri)
    : [...currentUser.value.favoritesItems, props.item.uri]
);

const toggleFavorite = () => {
  if (!canFavorite.value) {
    showError('Vous ne pouvez pas ajouter vos propres articles à vos favoris');
    return;
  }

  return updateUser({
    id: currentUser.value.id,
    entity: {
      favoritesItems: newFavorites.value
    }
  });
};
</script>

<template>
  <dsp-icon-button
    :icon="isFavorited ? 'heartFilled' : 'heartEmpty'"
    :title="
      t(`itemCard.${isFavorited ? 'removeFromFavorites' : 'addToFavorites'}`)
    "
    class="item-favorite-button"
    is-plain
    @click="toggleFavorite"
  />
</template>

<style lang="scss" scoped>
.item-favorite-button {
  border-radius: 50%;
  background-color: white;
}
</style>
