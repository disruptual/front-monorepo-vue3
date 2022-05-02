<script>
export default { name: 'ItemDetailsMedia' };
</script>

<script setup>
import { useItemDetails } from '../use-item-details';

const { item } = useItemDetails();

const imageUrl = () => {
  const media = item.value.medias.find(m => m['@id'] === item.value._mainMedia);

  return media?.thumbnails?.item;
};
</script>

<template>
  <dsp-flex>
    <div>swiper-column</div>
    <dsp-image :src="imageUrl()" :alt="item?.title" draggable="false" />
  </dsp-flex>
</template>
