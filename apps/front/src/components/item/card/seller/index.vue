<script>
export default { name: 'ItemCard' };
</script>

<script setup>
import { Item } from '@dsp/business';

const props = defineProps({
  item: { type: Item, required: true }
});
</script>

<template>
  <dsp-flex
    class="item-card-seller"
    as="router-link"
    align="center"
    wrap="nowrap"
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
</template>

<style lang="scss" scoped>
.item-card-seller {
  background: var(--color-gray-100);
  margin-top: var(--spacing-xs);
  margin-left: var(--spacing-xs);
  padding: var(--spacing-xxs);
  padding-right: var(--spacing-sm);
  border-radius: var(--border-radius-pill);
  max-width: 8em;
  font-size: var(--font-size-sm);

  .item-card__avatar {
    --avatar-size-sm: 2em;
  }
}
</style>
