<script>
export default { name: 'OrderDetails' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Order } from '@dsp/business';

import CloseProblemModal from './modals/close-problem.vue';
import SolveProblemModal from './modals/solve-problem.vue';

const props = defineProps({
  order: { type: Order, required: true }
});

const emit = defineEmits(['update']);
const { t } = useI18n();

const MODALS = { CLOSE: 'CLOSE', SOLVE: 'SOLVE' };
const openedModal = ref(null);

const problem = computed(() => props.order.orderProblems?.[0]);
</script>

<template>
  <div v-if="!problem" class="order-problem">
    Impossible d'afficher les informations du litige
  </div>
  <dsp-flex v-else direction="column" gap="sm" class="order-problem">
    <div class="order-problem__reason">
      Cause: {{ problem?.problemReason.content }}
    </div>
    <dsp-swiper>
      <dsp-swiper-item v-for="media in problem.medias" :key="media.id">
        <dsp-image :src="media.url" class="order-problem__image" />
      </dsp-swiper-item>
    </dsp-swiper>
    <dsp-flex v-if="order.isDisputed" gap="sm" align="center">
      <dsp-button
        size="sm"
        is-outlined
        is-rounded
        @click="openedModal = MODALS.SOLVE"
      >
        {{ t('order.details.solveProblemButton') }}
      </dsp-button>
      <dsp-button
        size="sm"
        is-outlined
        is-rounded
        @click="openedModal = MODALS.CLOSE"
      >
        {{ t('order.details.closeProblemButton') }}
      </dsp-button>
    </dsp-flex>
  </dsp-flex>

  <CloseProblemModal
    :is-opened="openedModal === MODALS.CLOSE"
    :order="order"
    @close="openedModal = null"
    @success="emit('update')"
  />
  <SolveProblemModal
    :is-opened="openedModal === MODALS.SOLVE"
    :order="order"
    @close="openedModal = null"
    @success="emit('update')"
  />
</template>

<style lang="scss" scoped>
.order-problem {
  background-color: var(--color-background);
  padding: var(--spacing-md);
  border: solid 1px var(--color-gray-300);
}
.order-problem__reason {
  font-weight: var(--font-weight-medium);
}

.order-problem__image {
  max-width: 80px;
  aspect-ratio: 1;
}
</style>
