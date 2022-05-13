<script>
export default { name: 'ItemDetailsSeller' };
</script>

<script setup>
import { computed } from 'vue';
import { useDevice } from '@dsp/ui';
import Rating from '@/components/user/rating/index.vue';
import { useItemDetails } from '../use-item-details';

const { item } = useItemDetails();
const seller = computed(() => item.value?.user);

const device = useDevice();
</script>

<template>
  <div class="item-details-seller">
    <dsp-flex wrap="nowrap" gap="md" as="header">
      <dsp-flex align="center" justify="center" direction="column" gap="xs">
        <dsp-plain-button
          :to="{ name: 'Profile', params: { slug: seller.slug } }"
          class="item-details-seller__avatar-link"
        >
          <dsp-avatar class="avatar" :user="seller" size="xl" />
        </dsp-plain-button>
        <Rating :user="seller" size="md" />
        <dsp-plain-button
          class="item-details-seller__reviews-link"
          :to="{ name: 'Profile', params: { slug: seller.slug } }"
        >
          Voir les {{ seller.reviewsReceived?.totalItems }} avis
        </dsp-plain-button>
      </dsp-flex>

      <dsp-flex class="infos" justify="flex-start" direction="column" gap="xs">
        <router-link
          :to="{ name: 'Profile', params: { slug: seller.slug } }"
          class="item-details-seller__username"
        >
          {{ seller.username }}
        </router-link>
        <dsp-flex gap="xs">
          <dsp-icon icon="mapDot" size="md" />
          <span>
            {{ seller?.mainAddress?.city }}
            {{ `(${seller?.mainAddress?.postalCode})` }}
          </span>
        </dsp-flex>
        <p>{{ seller.content }}</p>
      </dsp-flex>
    </dsp-flex>

    <dsp-grid :columns="device.isDesktop ? '0.65fr 0.4fr' : 1" gap="xs">
      <dsp-flex>
        <dsp-flex align="center" wrap="nowrap" gap="sm">
          <dsp-icon icon="clock" is-inline />
          Derniere visite: {{ seller.formatedLastConnectionAt }}
        </dsp-flex>
        <dsp-flex align="center" wrap="nowrap" gap="sm">
          <dsp-icon icon="clothesHanger" is-inline />
          Derniere mise à jour: {{ seller.formatedLastItemUpdatedAt }}
        </dsp-flex>
      </dsp-flex>
      <dsp-flex direction="column" gap="md">
        <dsp-button is-full-width>Contacter</dsp-button>
        <dsp-button is-full-width>Ne plus suivre</dsp-button>
      </dsp-flex>
    </dsp-grid>
  </div>
</template>

<style lang="scss" scoped>
.item-details-seller {
  background-color: var(--color-brand-100);
  padding: var(--spacing-sm);

  > header {
    padding-bottom: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    border-bottom: solid 1px var(--color-gray-400);
  }
}

.avatar {
  justify-self: start;
}

.item-details-seller__username {
  font-weight: var(--font-weight-bold);
}

.item-details-seller__reviews-link {
  padding: 0;
  font-size: var(--font-size-sm);
}

.item-details-seller__avatar-link {
  padding: 0;
}
</style>
