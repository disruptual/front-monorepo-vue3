<script>
export default { name: 'ItemDetailsAction' };
</script>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  //   props1: { type: String, required: false }
});

const { t } = useI18n();
const { replace } = useRouter();
const route = useRoute();
</script>

<template>
  <div>ACTIONS</div>
</template>
