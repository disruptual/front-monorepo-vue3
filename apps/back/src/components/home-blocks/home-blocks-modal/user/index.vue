<script>
export default { name: 'RecommendedUserModal' };
</script>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDebouncedRef } from '@dsp/core';
import { useRecommendedUserApi, useUserApi } from '@dsp/core';
import { useToast } from '@dsp/ui';
const { showError } = useToast();

const props = defineProps({
  isOpened: { type: Boolean, required: true },
  recommendedUser: {
    type: Object,
    required: true
  }
});
const emit = defineEmits(['success', 'close']);

const slugFilter = useDebouncedRef('', 500);

const { data: users } = useUserApi().findAllQuery(
  computed(() => ({
    filters: {
      slug: slugFilter.value
    },
    enabled: !!slugFilter.value
  }))
);

const { createMutation, deleteMutation } = useRecommendedUserApi();

const { mutate: createRecommendedUser, isLoading: isCreating } = createMutation(
  {
    onSuccess() {
      emit('success');
    },
    onError(err) {
      console.error(err);
      showError('Erreur lors de la création du top vendeur');
    }
  }
);

const { mutate: deleteRecommendedUser, isLoading: isDeleting } = deleteMutation(
  {
    onSuccess() {
      emit('success');
    },
    onError(err) {
      console.error(err);
      showError('Erreur lors de la suppression du top vendeur');
    }
  }
);

const addUserToRecommended = user => {
  createRecommendedUser({
    user: user.uri,
    position: props.recommendedUser.value.totalItems
  });
};

const removeUserToRecommended = user => {
  const { id } = getUserRecommended(user);
  deleteRecommendedUser(id);
};

const getUserRecommended = user => {
  return props.recommendedUser.value.find(
    recommendedUser => recommendedUser.user.id === user.id
  );
};
</script>

<template>
  <dsp-modal :is-opened="isOpened" @close="emit('close')">
    <dsp-center>
      <h2>Ajouter un top vendeur</h2>
    </dsp-center>
    <dsp-form-control v-model="slugFilter" label="Slug de l'utilisateur">
      <dsp-input-text
        v-model="slugFilter"
        class="inputsearch"
        spellcheck="false"
      />
    </dsp-form-control>
    <ul class="results-list">
      <dsp-flex
        v-for="user in users"
        :key="user.id"
        as="li"
        align="center"
        gap="sm"
      >
        <router-link
          class="result-user"
          target="_blank"
          :to="{
            name: 'AdminUserDetails',
            params: { slug: user.slug }
          }"
        >
          <dsp-avatar :user="user" />
          <span>{{ user.slug }}</span>
          <dsp-icon class="chevron" icon="chevronRight" size="sm" />
        </router-link>
        <dsp-flex align="center" gap="sm" class="container-action">
          <dsp-loading-button
            v-if="!!getUserRecommended(user)"
            class="button-remove"
            :show-label-while-loading="false"
            :is-loading="isCreating || isDeleting"
            @click="removeUserToRecommended(user)"
          >
            <dsp-icon icon="minus" size="sm" />
          </dsp-loading-button>
          <dsp-loading-button
            v-else
            class="button-add"
            :show-label-while-loading="false"
            :is-loading="isCreating || isDeleting"
            @click="addUserToRecommended(user)"
          >
            <dsp-icon icon="add" size="sm" />
          </dsp-loading-button>
        </dsp-flex>
      </dsp-flex>
    </ul>
  </dsp-modal>
</template>

<style lang="scss" scoped>
.dsp-input-text {
  margin-bottom: var(--spacing-md);
}
.button-add,
.button-remove {
  border-radius: var(--border-radius-circle);
  padding: var(--spacing-xs) !important;
}

.container-action {
  margin-left: auto;
}
.results-list {
  margin: 0;
  padding: 0;

  li {
    border-bottom: solid 1px var(--color-brand-200);

    .result-user {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--spacing-sm) 0;
      gap: var(--spacing-md);
      text-decoration: none;
      color: inherit;

      &:hover {
        transform: translateX(5px);
        transition: transform var(--transition-sm);
      }
    }
  }
}
</style>
