<script>
export default { name: 'ItemCard' };
</script>

<script setup>
import { Item } from '@dsp/business';
import { vLazyText } from '@dsp/ui';
import { useItemCard } from './index';

const props = defineProps({
  item: { type: Item, required: true }
});

const { toggleFavorite, favoriteButtonIcon, canFavorite } = useItemCard(props);
</script>

<template>
  <dsp-surface as="figure" class="item-card">
    <dsp-flex as="header" align="center" gap="sm" class="item-card__seller">
      <dsp-avatar :user="item?.user" size="sm" />
      <span>{{ item.user?.firstName }}</span>

      <dsp-icon-button
        v-if="canFavorite"
        :icon="favoriteButtonIcon"
        is-plain
        @click="toggleFavorite"
      />
    </dsp-flex>

    <dsp-aspect-ratio class="item-card__image-wrapper">
      <dsp-image :src="item.mainMedia?.thumbnails?.item" :alt="item.title" />
    </dsp-aspect-ratio>

    <figcaption>
      <dl>
        <dsp-visually-hidden>
          <dt>Marque</dt>
        </dsp-visually-hidden>
        <dsp-truncated-text v-lazy-text as="dd" class="item-card__brand">
          {{ item.brand?.name }}
        </dsp-truncated-text>

        <dsp-visually-hidden>
          <dt>Titre</dt>
        </dsp-visually-hidden>
        <dsp-truncated-text as="dd">{{ item.title }}</dsp-truncated-text>

        <dsp-visually-hidden>
          <dt>Catégorie</dt>
        </dsp-visually-hidden>
        <dsp-truncated-text v-lazy-text as="dd">
          {{ item.category?.name }}
        </dsp-truncated-text>

        <dsp-visually-hidden>
          <dt>Price</dt>
        </dsp-visually-hidden>
        <dd class="item-card__price">{{ item.formatedPrice }}</dd>
      </dl>
    </figcaption>
  </dsp-surface>
</template>

<style lang="scss" scoped>
.item-card {
  padding: var(--spacing-md);
  margin: 0;
}

header {
  margin-bottom: var(--spacing-xs);

  button {
    margin-left: auto;
  }
}

dl {
  margin: 0;
}

dd {
  line-height: 1.5;
  margin-left: 0;
}

.item-card__image-wrapper {
  margin-left: calc(-1 * var(--spacing-sm));
  margin-right: calc(-1 * var(--spacing-sm));
}

.item-card__brand {
  font-weight: var(--font-weight-bold);
}
</style>
