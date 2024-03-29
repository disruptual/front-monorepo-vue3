<script>
export default { name: 'HomeContentBlock' };
</script>

<script setup>
import { computed } from 'vue';
import {
  HOME_BLOCK_QUERIES,
  HOME_BLOCK_TYPES,
  RecommendedUser,
  RecommendedBrand,
  RecommendedCategory,
  Category,
  Item,
  Brand
} from '@dsp/business';
import { useCurrentUser, useCollectionQuery, useHttp } from '@dsp/core';
import { vReadableColor, useDevice } from '@dsp/ui';
import HomeContentBlockItem from './item/index.vue';
import HomeContentBlockUser from './user/index.vue';
import HomeContentBlockBrand from './brand/index.vue';
import HomeContentBlockCategory from './category/index.vue';

const props = defineProps({
  block: { type: Object, required: true }
});
const { data: currentUser } = useCurrentUser();
const device = useDevice();
const http = useHttp();

const queryToRequestMap = {
  [HOME_BLOCK_QUERIES.LAST_ITEMS]: '/items/search?sort[updated]=desc',
  [HOME_BLOCK_QUERIES.RECOMMENDED_ITEMS]: '/items/search?recommendation',
  [HOME_BLOCK_QUERIES.POPULAR_BRANDS]: '/brands?sort[rank]=desc',
  [HOME_BLOCK_QUERIES.RECOMMENDED_AND_POPULAR_BRANDS]:
    '/brands?orderByRecommendationAndRank',
  [HOME_BLOCK_QUERIES.RECOMMENDED_BRANDS]:
    '/recommended_brands?sort[position]=asc',
  [HOME_BLOCK_QUERIES.POPULAR_CATEGORIES]: '/categories?sort[rank]=desc',
  [HOME_BLOCK_QUERIES.RECOMMENDED_AND_POPULAR_CATEGORIES]:
    '/categories?orderByRecommendationAndRank',
  [HOME_BLOCK_QUERIES.RECOMMENDED_CATEGORIES]:
    '/recommended_categories?sort[position]=asc',
  [HOME_BLOCK_QUERIES.POPULAR_USERS]:
    '/users/search?sort[rank]=desc&avoidFavorites',
  [HOME_BLOCK_QUERIES.RECOMMENDED_AND_POPULAR_USERS]:
    '/users/search?orderByRecommendationAndRank',
  [HOME_BLOCK_QUERIES.RECOMMENDED_USERS]:
    '/recommended_users?sort[position]=asc'
};

const typeToModelMap = {
  [HOME_BLOCK_TYPES.USER]: RecommendedUser,
  [HOME_BLOCK_TYPES.CATEGORY]: RecommendedCategory,
  [HOME_BLOCK_TYPES.ITEM]: Item,
  [HOME_BLOCK_TYPES.BRAND]: RecommendedBrand
};

const typeToRelationsMap = {
  [HOME_BLOCK_TYPES.USER]: [],
  [HOME_BLOCK_TYPES.CATEGORY]: [],
  [HOME_BLOCK_TYPES.ITEM]: ['user', 'category', 'brand'],
  [HOME_BLOCK_TYPES.BRAND]: []
};

const typeToComponentMap = {
  [HOME_BLOCK_TYPES.ITEM]: HomeContentBlockItem,
  [HOME_BLOCK_TYPES.USER]: HomeContentBlockUser,
  [HOME_BLOCK_TYPES.CATEGORY]: HomeContentBlockCategory,
  [HOME_BLOCK_TYPES.BRAND]: HomeContentBlockBrand
};

const queryUrl = computed(() => {
  const base = queryToRequestMap[props.block.query];
  // const connected = currentUser.value ? '&connected' : '';

  return `${base}&itemsPerPage=${props.block.options.itemsPerSection}`;
});

const component = computed(() => typeToComponentMap[props.block.type]);
const model = computed(() => typeToModelMap[props.block.type]);
const relations = computed(() => typeToRelationsMap[props.block.type]);
const query = useCollectionQuery(queryUrl, () => http.get(queryUrl.value), {
  model,
  relations,
  onSuccess() {
    // recommended blocks contain incomplete data from the API
    // for examples, recommended users are missing a lot of fields
    // however, their uri will be from the related entity, ex: /users/123, instead of /recommanded_users/123
    // this could cause some issue with automatic caching of entities with other pages since some fields will be missing
    // The easiest way is to override the onSuccess callback and just do nothing
  }
});

const isSeeMoreTop = computed(() => {
  const { seeMore } = props.block.options;

  return !device.isMobile && seeMore?.enabled && seeMore?.position === 'HEADER';
});
const isSeeMoreBottom = computed(() => {
  const { seeMore } = props.block.options;
  if (!seeMore?.enabled) return false;

  return device.isMobile
    ? ['HEADER', 'BOTTOM'].includes(seeMore.position)
    : seeMore.position === 'BOTTOM';
});

const titleClass = computed(
  () =>
    props.block.options.title.upperCase &&
    'home-content-block__title--uppercase'
);
</script>

<template>
  <dsp-section>
    <div v-readable-color class="home-content-block">
      <dsp-container is-large>
        <dsp-flex as="header" justify="space-between" align="center">
          <dsp-section-heading :class="titleClass">
            {{ block.options.title.content }}
          </dsp-section-heading>
          <dsp-button v-if="isSeeMoreTop" class="see-more-button">
            Voir plus
          </dsp-button>
        </dsp-flex>

        <dsp-query-loader :query="query">
          <template #error="{ error }">
            <pre>{{ error }}</pre>
          </template>

          <template #default="{ entity }">
            <component :is="component" :data="entity" :block="block" />
          </template>
        </dsp-query-loader>

        <dsp-center v-if="isSeeMoreBottom" as="footer">
          <dsp-button class="see-more-button">Voir plus</dsp-button>
        </dsp-center>
      </dsp-container>
    </div>
  </dsp-section>
</template>

<style lang="scss" scoped>
.home-content-block {
  background-color: v-bind('props.block.options.backgroundColor');
  padding: var(--spacing-lg) 0;
  max-width: var(--100-vw);

  h2 {
    margin: 0;
  }

  header {
    margin-bottom: var(--spacing-md);
  }
  footer {
    margin-top: var(--spacing-md);
  }

  @include not-desktop {
    padding-left: var(--spacing-sm);
    padding-right: var(--spacing-sm);
  }

  @include mobile-only {
    header {
      padding-left: var(--spacing-sm);
    }
  }
}

.see-more-button {
  width: 15em;
}

.home-content-block__title--uppercase {
  text-transform: uppercase;
}
</style>
