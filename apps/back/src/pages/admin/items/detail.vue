<script>
export default { name: 'AdminItemDetailPage' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useItemApi } from '@dsp/core';

const props = defineProps({
  id: { type: String, required: true }
});
const { t } = useI18n();
const query = useItemApi().findByIdQuery(props.id, {
  requestOptions: { params: { display: 'all' } }
});

const breadCrumbLabel = computed(
  () => query.data.value?.title ?? t('breadcrumb.itemDetail')
);
const SliderUrls = computed(() =>
  query.data.value?.medias.map(media => media.url)
);
useBreadCrumbs(breadCrumbLabel);
</script>

<template>
  <dsp-query-loader v-slot="{ entity: item }" :query="query">
    <dsp-container is-small>
      <dsp-surface>
        <dsp-center>
          <h2>{{ item.title }}</h2>
        </dsp-center>
        <dsp-flex gap="md" justify="center">
          <dsp-slider :images-urls="SliderUrls" />

          <dsp-flex direction="column" gap="sm">
            <dsp-flex v-if="item.colors" align="center" gap="sm" class="color">
              <strong>Couleurs :</strong>
              <dsp-flex>
                <div
                  v-for="color in item.colors"
                  :key="color.id"
                  class="color-preview"
                  :style="{ '--color': '#' + color.hex }"
                />
              </dsp-flex>
            </dsp-flex>

            <dsp-flex v-if="item.category" gap="sm" class="category">
              <strong>Catégorie :</strong>
              <span>{{ item.category.name }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.condition" gap="sm" class="state">
              <strong>Etat :</strong>
              <span>{{ item.condition.stateName }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.size" gap="sm" class="size">
              <strong>Taille :</strong>
              <span>{{ item.size.name }}</span>
            </dsp-flex>

            <dsp-flex
              v-if="item.packageDelivery"
              gap="sm"
              class="package-delivery"
            >
              <strong>Format de colis :</strong>
              <span>{{ item.packageDelivery.name }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.brand" gap="sm" class="brand">
              <strong>Marque :</strong>
              <span>{{ item.brand.name }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.deliveries" gap="sm" class="deliveries">
              <strong>Modes de livraison :</strong>
              <span>{{ item.deliveriesString }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.composition" gap="sm" class="composition">
              <strong>Composition :</strong>
              <span>{{ item.composition }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.content" gap="sm" class="content">
              <strong>Description :</strong>
              <span>{{ item.content }}</span>
            </dsp-flex>

            <dsp-flex
              v-if="item.locations?.length > 0"
              gap="sm"
              class="locations"
            >
              <strong>Magasins de dépôt :</strong>
              <ul class="location-list">
                <li v-for="location in item.locations" :key="location.id">
                  {{ location.name }}
                </li>
              </ul>
            </dsp-flex>
          </dsp-flex>
        </dsp-flex>
      </dsp-surface>
    </dsp-container>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
.color-preview {
  width: var(--spacing-lg);
  height: var(--spacing-lg);
  background-color: var(--color);
  margin-right: 0.5rem;
}
</style>
