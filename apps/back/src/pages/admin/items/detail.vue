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
useBreadCrumbs(breadCrumbLabel);

const sliderUrls = computed(() =>
  query.data.value.medias.map(media => media.url)
);
</script>

<template>
  <dsp-query-loader v-slot="{ entity: item }" :query="query">
    <dsp-container is-small>
      <dsp-surface>
        <dsp-center>
          <h2>{{ item.title }}</h2>
        </dsp-center>
        <!-- <dsp-swiper as="ul">
          <dsp-swiper-item v-for="media in item.medias" :key="media.id" as="li">
            <dsp-image class="photo" :src="media.thumbnails?.avatar" />
          </dsp-swiper-item>
        </dsp-swiper> -->

        <dsp-slider :image-urls="sliderUrls" />

        <div v-if="item.colors" class="color">
          <strong>Couleurs :</strong>
          <dsp-flex>
            <div
              v-for="color in item.colors"
              :key="color.id"
              class="color-preview"
              :style="{ '--color': '#' + color.hex }"
            />
          </dsp-flex>
        </div>

        <div v-if="item.category" class="category">
          <strong>Catégorie :</strong>
          <span>{{ item.category.name }}</span>
        </div>

        <div v-if="item.condition" class="state">
          <strong>Etat :</strong>
          <span>{{ item.condition.stateName }}</span>
        </div>

        <div v-if="item.size" class="size">
          <strong>Taille :</strong>
          <span>{{ item.size.name }}</span>
        </div>

        <div v-if="item.packageDelivery" class="package-delivery">
          <strong>Format de colis :</strong>
          <span>{{ item.packageDelivery.name }}</span>
        </div>

        <div v-if="item.brand" class="brand">
          <strong>Marque :</strong>
          <span>{{ item.brand.name }}</span>
        </div>

        <div v-if="item.deliveries" class="deliveries">
          <strong>Modes de livraison :</strong>
          <span>{{ item.deliveriesString }}</span>
        </div>

        <div v-if="item.composition" class="composition">
          <strong>Composition :</strong>
          <span>{{ item.composition }}</span>
        </div>

        <div v-if="item.content" class="content">
          <strong>Description:</strong>
          <span>{{ item.content }}</span>
        </div>

        <div v-if="item.locations?.length > 0" class="locations">
          <strong>Magasins de dépôt:</strong>
          <ul class="location-list">
            <li v-for="location in item.locations" :key="location.id">
              {{ location.name }}
            </li>
          </ul>
        </div>
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
