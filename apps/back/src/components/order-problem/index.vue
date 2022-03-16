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
const isOpened = ref(false);

const emit = defineEmits(['update', 'close']);
const { t } = useI18n();

const MODALS = { CLOSE: 'CLOSE', SOLVE: 'SOLVE' };
const openedModal = ref(null);

const openedMedia = ref([]);
const isMediaOpened = media => openedMedia.value.includes(media);
const toggleMedia = media => {
  openedMedia.value.push(media);
};
const problem = computed(() => props.order.orderProblems?.[0]);
</script>

<template>
  <div v-if="!problem" class="order-problem">
    Impossible d'afficher les informations du litige
  </div>
  <dsp-flex
    v-else
    direction="column"
    gap="sm"
    class="order-problem"
    v-bind="$attrs"
  >
    <div class="order-problem__reason">
      <dt>Cause:</dt>
      <dd>{{ problem?.problemReason.content }}</dd>
    </div>
    <div class="order-problem__comment">
      <dt>Commentaire:</dt>
      <dd>{{ problem?.comment }}</dd>
    </div>
    <dsp-grid :columns="2" gap="sm" class="order-problem__container">
      <dsp-grid-item
        v-for="media in problem.medias"
        :key="media.id"
        as="dsp-plain-button"
        @click="toggleMedia(media.id)"
      >
        <dsp-image :src="media.url" class="order-problem__container__image" />
        <dsp-modal
          :is-opened="isMediaOpened(media.id)"
          @close="openedMedia = []"
        >
          <dsp-image :src="media.url" class="order-problem__container__image" />
        </dsp-modal>
      </dsp-grid-item>
    </dsp-grid>
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
  max-width: 100%;

  > * {
    max-width: 100%;
  }
}
.order-problem__reason,
.order-problem__comment {
  font-weight: var(--font-weight-medium);
  dt {
    font-weight: var(--font-weight-bold);
  }
  dd {
    margin: 0;
  }
}

.order-problem__container__image {
  // max-width: 80px;
  aspect-ratio: 1;
  user-select: none;
}
</style>
