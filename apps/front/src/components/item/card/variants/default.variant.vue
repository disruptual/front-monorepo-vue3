<script>
export default { name: 'ItemCard' };
</script>

<script setup>
import { Item } from '@dsp/business';
import { useItemCard } from '../use-item-card';
import ItemFavoriteButton from '@/components/item/favorite-button/index.vue';
import ItemCardInfos from '@/components/item/card/infos/index.vue';
import ItemCardMedia from '@/components/item/card/media/index.vue';
import ItemCardSeller from '@/components/item/card/seller/index.vue';
import ItemCardSizeTag from '@/components/item/card/size-tag/index.vue';

const props = defineProps({
  item: { type: Item, required: true }
});

const { imageUrl } = useItemCard(props);
</script>

<template>
  <dsp-surface as="article" class="item-card">
    <ItemCardMedia :item="props.item">
      <template #top-left>
        <ItemCardSeller :item="props.item" />
      </template>

      <template #top-right>
        <ItemFavoriteButton
          :item="props.item"
          class="item-card__favorite-button"
        />
      </template>

      <template #bottom-left>
        <ItemCardSizeTag :item="props.item" class="item-card__size-tag" />
      </template>
    </ItemCardMedia>

    <div class="item-card__infos">
      <ItemCardInfos :item="props.item" />
    </div>
  </dsp-surface>
</template>

<style lang="scss" scoped>
.item-card {
  padding: 0;
  margin: 0;
  position: relative;
}

.item-card__infos {
  padding: var(--spacing-sm);
}

.item-card__favorite-button {
  margin: var(--spacing-xs);
}

.item-card__size-tag {
  margin: var(--spacing-xs);
}
</style>
