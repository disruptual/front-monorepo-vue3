<script>
export default { name: 'UserProfileItems' };
</script>

<script setup>
import { useUserProfile } from '../use-user-profile';
import ItemGrid from '@/components/item/grid/index.vue';

const { user, userItems, queries } = useUserProfile();
</script>

<template>
  <dsp-section>
    <dsp-section-heading class="user-profile-items__heading">
      Ses articles
    </dsp-section-heading>

    <span class="user-profile-items__last-update">
      Dernière mise à jour: {{ user.formatedLastItemUpdatedAt }}
    </span>

    <div class="user-profile-items__count">
      {{ userItems.totalItems }} articles
    </div>
    <div class="user-profile-items__grid">
      <dsp-infinite-query-loader :query="queries.userItems">
        <template #no-results>
          {{ user.username }} Ne possède pas d'articles.
        </template>

        <template #default="{ data: items }">
          <ItemGrid :items="items" />
        </template>
      </dsp-infinite-query-loader>
    </div>
  </dsp-section>
</template>

<style lang="scss" scoped>
.user-profile-items__heading {
  display: inline-block;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  margin-right: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.user-profile-items__last-update {
  font-size: var(--font-size-sm);
}

.user-profile-items__count {
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
}
.user-profile-items__grid {
  margin: var(--spacing-md) 0;
}
</style>
