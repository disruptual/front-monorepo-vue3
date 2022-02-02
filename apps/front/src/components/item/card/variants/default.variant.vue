<script>
export default { name: 'ItemCard' };
</script>

<script setup>
import { Item } from '@dsp/business';
import { useDevice } from '@dsp/ui';
import { useItemCard } from './index';

const props = defineProps({
  item: { type: Item, required: true }
});

const {
  toggleFavorite,
  favoriteButtonIcon,
  favoriteButtonTitle,
  canFavorite,
  imageUrl
} = useItemCard(props);

const device = useDevice();
</script>

<template>
  <dsp-surface as="figure" class="item-card">
    <dsp-flex
      as="header"
      align="center"
      gap="xs"
      class="item-card__seller"
      wrap="nowrap"
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

      <dsp-icon-button
        v-if="canFavorite"
        :icon="favoriteButtonIcon"
        :title="favoriteButtonTitle"
        class="item-card__favorite-button"
        is-plain
        @click="toggleFavorite"
      />
    </dsp-flex>

    <dsp-aspect-ratio class="item-card__image-wrapper" ratio="1">
      <dsp-image :src="imageUrl" :alt="item.title" />
    </dsp-aspect-ratio>

    <figcaption>
      <div class="item-card__price">{{ item.formatedPrice }}</div>

      <div class="item-card__brand">
        {{ item.brand?.name }}
      </div>

      <div>{{ item.title }}</div>

      <dsp-truncated-text as="div">
        {{ item.category?.name }}
      </dsp-truncated-text>
    </figcaption>
  </dsp-surface>
</template>

<style lang="scss" scoped>
.item-card {
  padding: var(--spacing-sm);
  margin: 0;

  @include mobile-only {
    padding: var(--spacing-sm);
  }
}

figcaption {
  margin-top: var(--spacing-sm);
}

header {
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: var(--spacing-xs);

  button {
    margin-left: auto;
  }
}

.item-card__image-wrapper {
  margin-left: calc(-1 * var(--spacing-sm));
  margin-right: calc(-1 * var(--spacing-sm));
  overflow: hidden;

  img {
    transition: var(--transition-sm);
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.item-card__avatar {
  flex-shrink: 0;
}

.item-card__brand {
  font-weight: var(--font-weight-bold);
}

.item-card__price {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
}

.item-card__favorite-button {
  padding-right: 0;
  @include mobile-only {
    padding-left: 0;
  }
}
</style>
