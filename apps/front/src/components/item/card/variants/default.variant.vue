<script>
export default { name: 'ItemCard' };
</script>

<script setup>
import { Item } from '@dsp/business';
import { useItemCard } from './index';
import ItemFavoriteButton from '@/components/item/favorite-button/index.vue';
import ItemCardInfos from '@/components/item/card/infos/index.vue';

const props = defineProps({
  item: { type: Item, required: true }
});

const { imageUrl } = useItemCard(props);
</script>

<template>
  <dsp-surface as="article" class="item-card">
    <router-link
      :to="{ name: 'ItemDetails', params: { slug: item.slug } }"
      class="item-card__link-overlay"
      draggable="false"
    >
      {{ item.title }}
    </router-link>

    <dsp-flex
      as="header"
      align="center"
      gap="xs"
      class="item-card__seller"
      wrap="nowrap"
    >
      <dsp-flex
        as="router-link"
        align="center"
        gap="xs"
        :to="{ name: 'Profile', params: { slug: item.user?.slug } }"
      >
        <dsp-avatar
          v-if="item.user"
          :user="item?.user"
          size="sm"
          class="item-card__avatar"
        />
        <dsp-truncated-text width="auto">
          {{ item.user?.firstName }}
        </dsp-truncated-text>
      </dsp-flex>

      <ItemFavoriteButton
        :item="props.item"
        class="item-card__favorite-button"
      />
    </dsp-flex>

    <div class="item-card__image-wrapper">
      <dsp-image
        :src="imageUrl"
        :alt="item.title"
        width="100"
        height="100"
        draggable="false"
      />
    </div>

    <div class="item-card__infos">
      <ItemCardInfos :item="props.item" />
    </div>
  </dsp-surface>
</template>

<style lang="scss" scoped>
.item-card {
  padding: var(--spacing-sm);
  margin: 0;
  position: relative;

  &:hover img {
    transform: scale(1.05);
  }

  @include mobile-only {
    padding: var(--spacing-sm);
  }
}

.item-card__link-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
}

.item-card__seller {
  position: relative;
  z-index: 1;
}

.item-card__infos {
  margin-top: var(--spacing-sm);
}

header {
  margin-bottom: var(--spacing-xs);

  button {
    margin-left: auto;
  }
}

.item-card__image-wrapper {
  margin-left: calc(-1 * var(--spacing-sm));
  margin-right: calc(-1 * var(--spacing-sm));
  overflow: hidden;
  pointer-events: none;

  img {
    transition: var(--transition-sm);
    width: 100%;
    height: auto;
  }
}

.item-card__avatar {
  flex-shrink: 0;
}

.item-card__favorite-button {
  margin-right: calc(-1 * var(--spacing-sm));
  @include mobile-only {
    padding-left: 0;
  }
}
</style>
