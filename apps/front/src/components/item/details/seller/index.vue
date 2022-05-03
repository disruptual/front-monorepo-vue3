<script>
export default { name: 'ItemDetailsSeller' };
</script>

<script setup>
import { computed } from 'vue';
import Rating from '@/components/user/rating/index.vue';
import { useItemDetails } from '../use-item-details';

const { item } = useItemDetails();
const seller = computed(() => item.value?.user);
</script>

<template>
  <dsp-flex
    direction="column"
    justify="space-between"
    align="flex-start"
    class="item-details-seller"
  >
    <dsp-flex wrap="nowrap" gap="md">
      <dsp-flex align="center" justify="center" direction="column" gap="xs">
        <dsp-plain-button
          class="seller-link"
          :to="{ name: 'Profile', params: { slug: seller.slug } }"
        >
          <dsp-avatar class="avatar" :user="seller" size="lg" />
        </dsp-plain-button>
        <Rating :user="seller" size="md" />
        <dsp-plain-button
          class="see-reviews"
          :to="{ name: 'Profile', params: { slug: seller.slug } }"
        >
          voir les avis
        </dsp-plain-button>
      </dsp-flex>

      <dsp-flex class="infos" justify="flex-start" direction="column" gap="xs">
        <dsp-plain-button
          class="seller-link"
          :to="{ name: 'Profile', params: { slug: seller.slug } }"
        >
          <span>{{ seller.fullName }}</span>
        </dsp-plain-button>
        <dsp-flex gap="xs" align="flex-start" wrap="nowrap">
          <dsp-icon icon="mapDot" size="md" />
          <span>
            {{ seller?.mainAddress?.city }}
            {{ `(${seller?.mainAddress?.postalCode})` }}
          </span>
        </dsp-flex>
      </dsp-flex>
    </dsp-flex>
    <hr class="separator" />
    <dsp-flex wrap="nowrap">
      <dsp-flex>
        <p>Derniere visite: il y a 38j</p>
        <p>Derniere mise à jour: il y a 39j</p>
      </dsp-flex>
      <dsp-flex class="actions" gap="md">
        <dsp-button is-pill>Contacter</dsp-button>
        <dsp-button>Ne plus suivre</dsp-button>
      </dsp-flex>
    </dsp-flex>
  </dsp-flex>
</template>

<style lang="scss" scoped>
.see-reviews {
  padding: 0;
}
.actions {
  .dsp-button {
    width: 100%;
  }
}
.item-details-seller {
  background-color: var(--color-brand-100);
  padding: var(--spacing-sm);

  .seller-link {
    justify-content: flex-start;
    padding: 0;
  }
}

.separator {
  border: 1px solid var(--color-brand-200);
  width: 100%;
}
.infos {
  > * {
    margin-bottom: var(--spacing-xs);
  }
}
.avatar {
  justify-self: start;
}
</style>
