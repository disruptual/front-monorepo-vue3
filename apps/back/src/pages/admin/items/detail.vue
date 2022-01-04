<script>
export default { name: 'AdminItemDetailPage' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useItemApi } from '@dsp/core';
import { vTooltip } from '@dsp/ui';

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
              <strong>{{ t('itemDetail.infos.colors') }}</strong>
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
              <strong>{{ t('itemDetail.infos.categorie') }}</strong>
              <span>{{ item.category.name }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.condition" gap="sm" class="state">
              <strong>{{ t('itemDetail.infos.condition') }}</strong>
              <span>{{ item.condition.stateName }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.size" gap="sm" class="size">
              <strong>{{ t('itemDetail.infos.size') }}</strong>
              <span>{{ item.size.name }}</span>
            </dsp-flex>

            <dsp-flex
              v-if="item.packageDelivery"
              gap="sm"
              class="package-delivery"
            >
              <strong>{{ t('itemDetail.infos.packageDelivery') }}</strong>
              <span>{{ item.packageDelivery.name }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.brand" gap="sm" class="brand">
              <strong>{{ t('itemDetail.infos.brand') }}</strong>
              <span>{{ item.brand.name }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.deliveries" gap="sm" class="deliveries">
              <strong>{{ t('itemDetail.infos.delivery') }}</strong>
              <span>{{ item.deliveriesString }}</span>
            </dsp-flex>

            <dsp-flex v-if="item.composition" gap="sm" class="composition">
              <strong>{{ t('itemDetail.infos.composition') }}</strong>
              <span>{{ item.composition }}</span>
            </dsp-flex>

            <div v-if="item.content" class="content">
              <strong>{{ t('itemDetail.infos.content') }}</strong>
              <span>{{ item.content }}</span>
            </div>
            <dsp-flex
              v-if="item.locations?.length > 0"
              gap="sm"
              class="locations"
            >
              <strong>{{ t('itemDetail.infos.locationDelivery') }}</strong>
              <ul class="location-list">
                <li v-for="location in item.locations" :key="location.id">
                  {{ location.name }}
                </li>
              </ul>
            </dsp-flex>
            <dsp-flex direction="column">
              <h3>{{ t('itemDetail.seller') }}</h3>
              <router-link
                v-if="item.user"
                class="seller"
                :to="{
                  name: 'AdminUserDetails',
                  params: { slug: item.user?.slug }
                }"
              >
                <dsp-flex
                  gap="sm"
                  align="center"
                  class="seller__container"
                  justify="space-around"
                >
                  <dsp-flex align="center" gap="sm">
                    <dsp-avatar :user="item.user" />
                    <span>{{ item.user?.username }}</span>
                  </dsp-flex>
                  <dsp-icon icon="chevronRight" />
                </dsp-flex>
              </router-link>
            </dsp-flex>
            <dsp-flex direction="column" class="statistics">
              <h3>{{ t('itemDetail.statistics.title') }}</h3>
              <dsp-flex direction="column">
                <dsp-flex
                  v-if="item.stats"
                  align="center"
                  justify="space-between"
                  class="row"
                  gap="sm"
                >
                  <dsp-flex gap="sm">
                    <strong class="label">
                      {{ t('itemDetail.statistics.potentialBuyer') }}
                    </strong>
                    <span
                      v-tooltip="
                        t('itemDetail.statistics.potentialBuyerDetail')
                      "
                    >
                      <dsp-icon icon="info" />
                    </span>
                  </dsp-flex>
                  <span>
                    {{ item.stats[0].totalCartWhereThisItemIsAdded }}
                  </span>
                </dsp-flex>
                <dsp-flex
                  v-if="item.stats"
                  align="center"
                  justify="space-between"
                  class="row"
                  gap="sm"
                >
                  <strong class="label">
                    {{ t('itemDetail.statistics.cart') }}
                  </strong>
                  <span>{{ item.stats[0].totalCartWhereThisItemIsAdded }}</span>
                </dsp-flex>
                <dsp-flex
                  v-if="item.stats"
                  align="center"
                  justify="space-between"
                  class="row"
                  gap="sm"
                >
                  <strong class="label">
                    {{ t('itemDetail.statistics.favorite') }}
                  </strong>
                  <span>
                    {{
                      item.stats[0]
                        .totalOfUserWhoHaveAddedThisItemToTheirFavorites
                    }}
                  </span>
                </dsp-flex>
                <dsp-flex
                  align="center"
                  justify="space-between"
                  class="row"
                  gap="sm"
                >
                  <dsp-flex gap="sm">
                    <strong class="label">
                      {{ t('itemDetail.statistics.appear') }}
                    </strong>
                    <span v-tooltip="t('itemDetail.statistics.appearDetail')">
                      <dsp-icon icon="info" />
                    </span>
                  </dsp-flex>
                  <span>{{ item.statSoftViewed }}</span>
                </dsp-flex>

                <dsp-flex
                  justify="space-between"
                  align="center"
                  class="row"
                  gap="sm"
                >
                  <dsp-flex gap="sm">
                    <strong class="label">
                      {{ t('itemDetail.statistics.views') }}
                    </strong>
                    <span v-tooltip="t('itemDetail.statistics.viewsDetail')">
                      <dsp-icon icon="info" />
                    </span>
                  </dsp-flex>
                  <span>{{ item.statHardViewed }}</span>
                </dsp-flex>
              </dsp-flex>
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
.content {
  span {
    margin-left: var(--spacing-sm);
  }
}
.seller {
  border: 1px solid var(--color-separator);
  width: 20vw;
  @include mobile-only {
    width: 60vw;
  }
  transition: all var(--transition-sm);
  color: var(--color-text);
  text-decoration: none;
  .seller__container {
    padding: var(--spacing-sm);
  }
}
.seller:hover {
  transform: translate(5px);
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.statistics {
  .label {
    text-align: center;
  }
  .row {
    border: 1px solid var(--color-separator);
    padding: var(--spacing-sm);
  }
}
</style>
