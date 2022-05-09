<script>
export default { name: 'UserProfileInfos' };
</script>

<script setup>
import { computed } from 'vue';
import { useDevice } from '@dsp/ui';
import { useUserProfile } from '../use-user-profile';
import UserRating from '@/components/user/rating/index.vue';
import UserAddress from '@/components/user/address/index.vue';

const device = useDevice();
const { user } = useUserProfile();

const columns = computed(() => (device.isMobile ? 1 : 'auto 1fr auto'));
</script>

<template>
  <dsp-section>
    <dsp-grid :columns="columns">
      <dsp-center gap="xs">
        <dsp-avatar :user="user" size="xl" />
        <UserRating :user="user" size="sm" />
        <dsp-plain-button
          :to="{ query: { section: 'reviews' } }"
          class="user-profile-infos__reviews-link"
        >
          Voir les {{ user.reviewsReceived?.totalItems }} avis
        </dsp-plain-button>
      </dsp-center>

      <dsp-flex direction="column" gap="xs">
        <dsp-section-heading class="user-profile-infos__heading">
          {{ user.username }}
        </dsp-section-heading>
        <UserAddress :address="user.mainAddress" />
        <dsp-flex gap="sm" align="center" wrap="nowrap">
          <dsp-icon icon="clock" size="md" />
          <div>Dernière visite : {{ user.formatedLastConnectionAt }}</div>
        </dsp-flex>
      </dsp-flex>

      <dsp-flex direction="column" gap="xs" class="user-profile-infos__actions">
        <dsp-button>Contacter</dsp-button>
        <dsp-button>Suivre</dsp-button>
        <div class="user-profile-infos__follower-count">
          {{ user.numberOfFollowers }} abonnés
        </div>
        <dsp-plain-button class="user-profile-infos__report-toggle">
          Signaler
        </dsp-plain-button>
      </dsp-flex>
    </dsp-grid>
  </dsp-section>
</template>

<style lang="scss" scoped>
.user-profile-infos__heading {
  margin: 0;
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-lg);
}

.user-profile-infos__reviews-link {
  font-size: var(--font-size-sm);
}

.user-profile-infos__actions {
  min-width: 12em;
  border-left: solid 1px var(--color-separator);
  padding-left: var(--spacing-md);
}

.user-profile-infos__follower-count,
.user-profile-infos__report-toggle {
  align-self: flex-end;
}

.user-profile-infos__report-toggle {
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  text-decoration: underline;
}
</style>
