import { computed } from 'vue';

export const useItemCard = props => {
  const imageUrl = computed(() => {
    const { item } = props;
    const media = item.medias.find(m => m['@id'] === item._mainMedia);

    return media?.thumbnails?.itemList;
  });

  return {
    imageUrl
  };
};
