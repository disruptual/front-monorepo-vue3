<script>
export default { name: 'ItemDetailsMedia' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { Item } from '@dsp/business';
const props = defineProps({
  item: { type: Item, required: true }
});

const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();

const imageUrl = () => {
  const media = props.item.medias.find(m => m['@id'] === props.item._mainMedia);

  return media?.thumbnails?.item;
};
</script>

<template>
  <dsp-flex>
    <div>swiper-column</div>
    <dsp-image :src="imageUrl()" :alt="item?.title" draggable="false" />
  </dsp-flex>
</template>
