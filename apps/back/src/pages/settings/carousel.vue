<script>
export default { name: 'SettingsCarousel' };
</script>

<script setup>
import { useCarouselApi } from '@dsp/core';
import CarouselEditor from '@/components/carousel-editor/index.vue';
import { useI18n } from 'vue-i18n';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';

const { t } = useI18n();
useBreadCrumbs(t('breadcrumb.carousel'));

const query = useCarouselApi().findAllQuery();
</script>
<template>
  <dsp-surface>
    <dsp-container>
      <h2>Carrousel</h2>
      <dsp-alert>
        Personalisez le carrousel d'images qui apparait sur la page d'accueil de
        votre application
        <br />
        Vous pouvez modifier les slides sur différents formats, leur wordings,
        ainsi que leur position.
      </dsp-alert>
    </dsp-container>
    <dsp-query-loader v-slot="{ entity: carousels }" :query="query">
      <CarouselEditor
        :carousel="carousels[0]"
        @save:success="query.refetch.value()"
      />
    </dsp-query-loader>
  </dsp-surface>
</template>
