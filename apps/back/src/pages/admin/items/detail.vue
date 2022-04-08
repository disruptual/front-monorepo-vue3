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
        <dl gap="md" justify="center">
          <dsp-slider :images-urls="SliderUrls" />

          <dsp-flex direction="column" gap="sm" class="info">
            <dsp-flex v-if="item.colors" align="center" gap="sm" class="color">
              <dt class="info__label">{{ t('itemDetail.infos.colors') }}</dt>
              <dd>
                <div
                  v-for="color in item.colors"
                  :key="color.id"
                  class="color-preview"
                  :style="{ '--color': '#' + color.hex }"
                />
              </dd>
            </dsp-flex>
            <dsp-flex v-if="item.category" gap="sm" class="category">
              <dt class="info__label">{{ t('itemDetail.infos.categorie') }}</dt>
              <dd>{{ item.category.name }}</dd>
            </dsp-flex>

            <dsp-flex v-if="item.condition" gap="sm" class="state">
              <dt class="info__label">{{ t('itemDetail.infos.condition') }}</dt>
              <dd>{{ item.condition.stateName }}</dd>
            </dsp-flex>

            <dsp-flex v-if="item.size" gap="sm" class="size">
              <dt class="info__label">{{ t('itemDetail.infos.size') }}</dt>
              <dd>{{ item.size.name }}</dd>
            </dsp-flex>

            <dsp-flex
              v-if="item.packageDelivery"
              gap="sm"
              class="package-delivery"
            >
              <dt class="info__label">
                {{ t('itemDetail.infos.packageDelivery') }}
              </dt>
              <dd>{{ item.packageDelivery.name }}</dd>
            </dsp-flex>

            <dsp-flex v-if="item.brand" gap="sm" class="brand">
              <dt class="info__label">{{ t('itemDetail.infos.brand') }}</dt>
              <dd>{{ item.brand.name }}</dd>
            </dsp-flex>

            <dsp-flex v-if="item.deliveries" gap="sm" class="deliveries">
              <dt class="info__label">{{ t('itemDetail.infos.delivery') }}</dt>
              <dd>{{ item.deliveriesString }}</dd>
            </dsp-flex>

            <dsp-flex v-if="item.composition" gap="sm" class="composition">
              <dt class="info__label">
                {{ t('itemDetail.infos.composition') }}
              </dt>
              <dd>{{ item.composition }}</dd>
            </dsp-flex>

            <div v-if="item.content" class="content">
              <dt class="info__label">{{ t('itemDetail.infos.content') }}</dt>
              <dd>{{ item.content }}</dd>
            </div>

            <dsp-flex
              v-if="item.locations?.length > 0"
              gap="sm"
              class="locations"
            >
              <dt class="info__label">
                {{ t('itemDetail.infos.locationDelivery') }}
              </dt>
              <dd class="location-list">
                <li v-for="location in item.locations" :key="location.id">
                  {{ location.name }}
                </li>
              </dd>
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
                <dsp-flex gap="sm" align="center" class="seller__container">
                  <dsp-avatar :user="item.user" />
                  <span>{{ item.user?.username }}</span>
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
                    <dt class="label">
                      {{ t('itemDetail.statistics.potentialBuyer') }}
                    </dt>
                    <dt
                      v-tooltip="
                        t('itemDetail.statistics.potentialBuyerDetail')
                      "
                    >
                      <dsp-icon icon="info" />
                    </dt>
                  </dsp-flex>
                  <dd>
                    {{ item.stats[0].totalCartWhereThisItemIsAdded }}
                  </dd>
                </dsp-flex>
                <dsp-flex
                  v-if="item.stats"
                  align="center"
                  justify="space-between"
                  class="row"
                  gap="sm"
                >
                  <dt class="label">
                    {{ t('itemDetail.statistics.cart') }}
                  </dt>
                  <dd>{{ item.stats[0].totalCartWhereThisItemIsAdded }}</dd>
                </dsp-flex>
                <dsp-flex
                  v-if="item.stats"
                  align="center"
                  justify="space-between"
                  class="row"
                  gap="sm"
                >
                  <dt class="label">
                    {{ t('itemDetail.statistics.favorite') }}
                  </dt>
                  <dd>
                    {{
                      item.stats[0]
                        .totalOfUserWhoHaveAddedThisItemToTheirFavorites
                    }}
                  </dd>
                </dsp-flex>
                <dsp-flex
                  align="center"
                  justify="space-between"
                  class="row"
                  gap="sm"
                >
                  <dsp-flex gap="sm">
                    <dt class="label">
                      {{ t('itemDetail.statistics.appear') }}
                    </dt>
                    <dt v-tooltip="t('itemDetail.statistics.appearDetail')">
                      <dsp-icon icon="info" />
                    </dt>
                  </dsp-flex>
                  <dd>{{ item.statSoftViewed }}</dd>
                </dsp-flex>

                <dsp-flex
                  justify="space-between"
                  align="center"
                  class="row"
                  gap="sm"
                >
                  <dsp-flex gap="sm">
                    <dt class="label">
                      {{ t('itemDetail.statistics.views') }}
                    </dt>
                    <dt v-tooltip="t('itemDetail.statistics.viewsDetail')">
                      <dsp-icon icon="info" />
                    </dt>
                  </dsp-flex>
                  <dd>{{ item.statHardViewed }}</dd>
                </dsp-flex>
              </dsp-flex>
            </dsp-flex>
          </dsp-flex>
        </dl>
      </dsp-surface>
    </dsp-container>
  </dsp-query-loader>
</template>

<style lang="scss" scoped>
dd {
  margin: 0;
}
.color-preview {
  width: var(--spacing-lg);
  height: var(--spacing-lg);
  background-color: var(--color);
  margin-right: 0.5rem;
}
.info {
  margin-top: var(--spacing-md);
  .info__label {
    font-weight: var(--font-weight-bold);
  }
}

.content {
  dd {
    text-align: justify;
  }
}
.seller {
  @include mobile-only {
    width: 60vw;
  }
  transition: all var(--transition-sm);
  color: var(--color-text);
  text-decoration: none;
}
.seller:hover,
.seller:focus {
  transform: translate(5px);
  color: var(--color-brand-500);
  border-color: var(--color-brand-500);
}
.statistics {
  .label {
    text-align: center;
    font-weight: var(--font-weight-bold);
  }
  .row {
    border: 1px solid var(--color-separator);
    padding: var(--spacing-sm);
  }
}
</style>
