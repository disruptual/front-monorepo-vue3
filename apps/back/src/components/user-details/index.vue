<script>
export default { name: 'UserDetails' };
</script>

<script setup>
import { ref, unref, computed } from 'vue';
import { User, USER_ROLES } from '@dsp/business';
import { useForm } from '@dsp/ui';
import { useI18n } from 'vue-i18n';
import { useUserApi } from '@dsp/core';
import { USER_DETAILS_TABS as TABS } from '@/utils/constants';

const props = defineProps({
  user: { type: User, required: true }
});

const { t } = useI18n();
const userApi = useUserApi();
const { mutateAsync: updateUser } = userApi.updateMutation();

const isEditing = ref(false);

const form = useForm({
  onSubmit(values) {
    return updateUser({ id: props.user.id, entity: values });
  }
});
const [, formActions] = form;

const passwordConfirmValidators = [
  {
    name: 'passwordMatch',
    message: t('form.errors.passwordMatch'),
    handler(value, { formContext }) {
      const { values } = unref(formContext);

      return value === values.value.plainPassword;
    }
  }
];

const formattedRoles = computed(() =>
  props.user.roles.map(role => t(`user.roles.${role}`)).join(' - ')
);

const itemsLink = computed(() => ({
  query: { section: TABS.ITEMS }
}));
const ordersLink = computed(() => ({
  query: { section: TABS.ORDERS }
}));
</script>

<template>
  <dsp-switch
    v-model="isEditing"
    class="editing-switch"
    :label="t('user.details.editModeSwitchLabel')"
  />
  <dsp-center>
    <h2>
      <dsp-flex justify="space-between" align="center">
        {{ user.fullName }}
      </dsp-flex>
    </h2>
    <dsp-avatar :user="user" size="lg" />
  </dsp-center>

  <dsp-smart-form :form="form">
    <div>{{ t('user.details.lastName') }}</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="lastName"
      :initial-value="user.lastName"
      required
    >
      <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
    </dsp-smart-form-field>
    <div v-else>{{ user.lastName }}</div>

    <div>{{ t('user.details.firstName') }}</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="firstName"
      :initial-value="user.firstName"
      required
    >
      <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
    </dsp-smart-form-field>
    <div v-else>{{ user.firstName }}</div>

    <div>{{ t('user.details.email') }}</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="email"
      :initial-value="user.email"
      required
      email
    >
      <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
    </dsp-smart-form-field>
    <div v-else>{{ user.email }}</div>

    <div>{{ t('user.details.bio') }}</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="content"
      :initial-value="user.content"
    >
      <dsp-input-text v-model="slotProps.field.value" v-bind="slotProps" />
    </dsp-smart-form-field>
    <div v-else>{{ user.content }}</div>

    <div>{{ t('user.details.phone') }}</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      name="phone"
      :initial-value="user.phone"
    >
      <dsp-input-text
        v-model="slotProps.field.value"
        type="phone"
        v-bind="slotProps"
      />
    </dsp-smart-form-field>
    <div v-else>{{ user.phone }}</div>

    <template v-if="isEditing">
      <div>{{ t('user.details.password') }}</div>
      <dsp-smart-form-field v-slot="slotProps" name="password">
        <dsp-input-password
          v-model="slotProps.field.value"
          v-bind="slotProps"
        />
      </dsp-smart-form-field>

      <div>{{ t('user.details.passwordConfirm') }}</div>
      <dsp-smart-form-field
        v-slot="slotProps"
        name="passwordConfirm"
        :validators="passwordConfirmValidators"
      >
        <dsp-input-password
          v-model="slotProps.field.value"
          v-bind="slotProps"
        />
      </dsp-smart-form-field>
    </template>
    <template v-else>
      <div>{{ t('user.details.deliveries') }}</div>
      <dsp-flex gap="sm" wrap="wrap">
        <div v-for="delivery in user.deliveries" :key="delivery">
          {{ t(`delivery.modes.${delivery.tag}`) }}
        </div>
      </dsp-flex>

      <div>{{ t('user.details.ibanCount') }}</div>
      <div>{{ user.ibans?.length }}</div>

      <div>{{ t('user.details.itemCount') }}</div>
      <div>
        {{ user.items?.length }}
        <router-link :to="itemsLink">
          ({{ t('user.details.seeDetails') }})
        </router-link>
      </div>

      <div>{{ t('user.details.orderCount') }}</div>
      <div>
        {{ user.orders?.length }}
        <router-link :to="ordersLink">
          ({{ t('user.details.seeDetails') }})
        </router-link>
      </div>
    </template>

    <div>{{ t('user.details.roles') }}</div>
    <dsp-smart-form-field
      v-if="isEditing"
      v-slot="slotProps"
      :initial-value="user.roles"
      name="roles"
    >
      <div>
        <dsp-checkbox
          v-for="role in Object.values(USER_ROLES)"
          :id="role"
          :key="role"
          v-model="slotProps.field.value"
          :value="role"
          :label="t(`user.roles.${role}`)"
        />
      </div>
    </dsp-smart-form-field>
    <div v-else>{{ formattedRoles }}</div>

    <dsp-flex
      v-if="isEditing"
      justify="space-between"
      class="form-actions"
      gap="sm"
    >
      <dsp-button type="button" is-outlined @click="formActions.reset">
        {{ t('user.details.form.cancel') }}
      </dsp-button>
      <dsp-smart-form-submit v-if="isEditing">
        {{ t('user.details.form.submit') }}
      </dsp-smart-form-submit>
    </dsp-flex>
  </dsp-smart-form>
</template>

<style lang="scss" scoped>
form {
  margin-top: var(--spacing-sm);
  line-height: 1.5;

  @include desktop-only {
    --label-min-width: 180px;
    display: grid;
    grid-template-columns: minmax(var(--label-min-width), auto) 1fr;
    gap: var(--spacing-sm);
    align-items: center;
  }

  & > *:nth-child(odd) {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-light);
    @include desktop-only {
      text-align: right;
    }
    @include not-desktop {
      margin-top: var(--spacing-md);
    }
  }
}

.form-actions {
  grid-column: 1 / -1;
  button {
    flex-grow: 1;
  }
}

a {
  color: var(--color-brand-500);
}

.editing-switch {
  margin-left: auto;
  width: fit-content;
  font-size: var(--font-size-sm);
}
</style>
