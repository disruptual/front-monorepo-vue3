<script setup>
import { DisruptualDevtoolsConsole } from '@dsp/devtools';
import { useBreadCrumbs } from '@/hooks/useBreadcrumbs';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
useBreadCrumbs(t('breadcrumb.devtools'));
</script>

<template>
  <dsp-container>
    <dsp-surface>
      <DisruptualDevtoolsConsole />
    </dsp-surface>
  </dsp-container>
</template>
